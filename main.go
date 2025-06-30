package main

import (
	"context"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/exec"
	"sync"
	"time"

	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/google/uuid"
	"github.com/hashicorp/go-plugin"
	"github.com/mortenson/yjs-go/proto"
	"google.golang.org/grpc"
)

type GRPCClient struct {
	client proto.YJSClient
}

func (m *GRPCClient) Test(message string) (string, error) {
	out, err := m.client.Test(context.Background(), &proto.TestRequest{
		Message: message,
	})
	if err != nil {
		return "", err
	}
	return out.Message, err
}

func (m *GRPCClient) SyncV1(docname string, origin string) ([]byte, error) {
	out, err := m.client.SyncV1(context.Background(), &proto.SyncV1Request{
		Docname: docname,
		Origin:  origin,
	})
	if err != nil {
		return nil, err
	}
	return out.Message, err
}

func (m *GRPCClient) Sync(docname string, origin string) (*proto.SyncResponse, error) {
	out, err := m.client.Sync(context.Background(), &proto.SyncRequest{
		Docname: docname,
		Origin:  origin,
	})
	if err != nil {
		return nil, err
	}
	return out, err
}

func (m *GRPCClient) WebsocketMessage(docname string, message []byte, origin string) ([]byte, error) {
	out, err := m.client.WebsocketMessage(context.Background(), &proto.WebsocketMessageRequest{
		Docname: docname,
		Message: message,
		Origin:  origin,
	})
	if err != nil {
		return nil, err
	}
	return out.Message, err
}

func (m *GRPCClient) RemoveClient(docname string, origins []string) error {
	_, err := m.client.RemoveClient(context.Background(), &proto.RemoveClientRequest{
		Docname: docname,
		Origins: origins,
	})
	return err
}

func (m *GRPCClient) Close() error {
	_, err := m.client.Close(context.Background(), &proto.Empty{})
	return err
}

type GRPCServer struct {
	proto.UnimplementedYJSServer
}

type YJSPlugin struct {
	plugin.NetRPCUnsupportedPlugin
}

func (p *YJSPlugin) GRPCServer(broker *plugin.GRPCBroker, s *grpc.Server) error {
	proto.RegisterYJSServer(s, &GRPCServer{})
	return nil
}

func (p *YJSPlugin) GRPCClient(ctx context.Context, broker *plugin.GRPCBroker, c *grpc.ClientConn) (interface{}, error) {
	return &GRPCClient{
		client: proto.NewYJSClient(c),
	}, nil
}

func main() {
	usersMu := &sync.RWMutex{}
	// docname -> userID -> connection
	users := map[string]map[string]net.Conn{}

	client := plugin.NewClient(&plugin.ClientConfig{
		HandshakeConfig: plugin.HandshakeConfig{
			ProtocolVersion:  1,
			MagicCookieKey:   "YJS_GO",
			MagicCookieValue: "hello_world",
		},
		Plugins: map[string]plugin.Plugin{
			"yjs": &YJSPlugin{},
		},
		Cmd:              exec.Command("node", "--experimental-strip-types", "--no-warnings=ExperimentalWarning", "yjs-go-plugin/main.ts"),
		AllowedProtocols: []plugin.Protocol{plugin.ProtocolGRPC},
		SyncStdout:       os.Stdout,
		SyncStderr:       os.Stderr,
		// Logger:           hclog.Default(),
	})
	defer plugin.CleanupClients()

	rpcClient, err := client.Client()
	if err != nil {
		panic(err)
	}

	raw, err := rpcClient.Dispense("yjs")
	if err != nil {
		panic(err)
	}
	defer rpcClient.Close()

	yjs := raw.(*GRPCClient)
	defer yjs.Close()

	http.HandleFunc("/ws/{documentName}", func(w http.ResponseWriter, r *http.Request) {
		docname := r.PathValue("documentName")
		conn, _, _, err := ws.UpgradeHTTP(r, w)
		if err != nil {
			slog.Error("cannot upgrade", "error", err)
			return
		}
		userId := uuid.New().String()
		usersMu.Lock()
		_, ok := users[docname]
		if !ok {
			users[docname] = map[string]net.Conn{}
		}
		users[docname][userId] = conn
		usersMu.Unlock()
		go func() {
			defer conn.Close()

			resp, err := yjs.SyncV1(docname, userId)
			if err != nil {
				slog.Error("yjs.SyncV1 call failed", "error", err)
				return
			}
			err = wsutil.WriteServerBinary(conn, resp)
			if err != nil {
				slog.Error("sending syncV1 to client failed", "error", err)
				return
			}

			for {
				msg, err := wsutil.ReadClientBinary(conn)
				if err != nil {
					slog.Error("cannot read client message", "error", err)
					return
				}
				resp, err := yjs.WebsocketMessage(docname, msg, userId)
				if err != nil {
					slog.Error("yjs.WebsocketMessage call failed", "error", err)
					return
				}
				if resp != nil {
					err = wsutil.WriteServerBinary(conn, resp)
					if err != nil {
						slog.Error("sending yjs.WebsocketMessage to client failed", "error", err)
						return
					}
				}
			}
		}()
	})

	ticker := time.NewTicker(100 * time.Millisecond)
	go func() {
		for range ticker.C {
			needsRemoved := map[string][]string{}
			usersMu.RLock()
			for docname, docUsers := range users {
				for id, user := range docUsers {
					resp, err := yjs.Sync(docname, "server")
					if err != nil {
						slog.Error("yjs.Sync call failed", "error", err)
						continue
					}
					err = wsutil.WriteServerBinary(user, resp.AwarenessMessage)
					if err != nil {
						needsRemoved[docname] = append(needsRemoved[docname], id)
						slog.Error("sending yjs.Sync awareness to client failed", "error", err)
						continue
					}
					err = wsutil.WriteServerBinary(user, resp.DocMessage)
					if err != nil {
						needsRemoved[docname] = append(needsRemoved[docname], id)
						slog.Error("sending yjs.Sync awareness to client failed", "error", err)
						continue
					}
				}
			}
			usersMu.RUnlock()
			usersMu.Lock()
			for docname, ids := range needsRemoved {
				yjs.RemoveClient(docname, ids)
				for _, id := range ids {
					delete(users[docname], id)
				}
			}
			usersMu.Unlock()
		}
	}()

	http.Handle("/", http.FileServer(http.Dir("./static")))

	http.ListenAndServe(":9003", nil)
}
