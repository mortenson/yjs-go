# yjs-go

A playground for integrating [Yjs](https://yjs.dev/) with a Go webserver using
[go-plugin](https://github.com/hashicorp/go-plugin).

This is mostly a project for fun and not meant to be equivalent to
[y-websocket-server](https://github.com/yjs/y-websocket-server/), but it'd be
nice if there was some parity there.

## Why

I use Go and didn't really want to run a separate Node server, especially with
authorization and persistence in mind.

I tried to use [yffi](https://github.com/y-crdt/y-crdt/tree/main/yffi) and cgo,
but it both didn't work and using cgo was pretty unsavory as well. So I decided
to try out go-plugin and see if I could just let a Node subprocess handle all
the Yjs operations.

Also, fun fact, I couldn't find anything else on GitHub that used go-plugin to
dispatch to Node/JavaScript so this may be a good example for that in general.

Unfortunately over the course of the project I realized that I would still have
to figure out horizontal scaling, which made me reconsider why this is a useful
project at all. However if I continue to use Yjs in the future, it'd be pretty
nice to have Go at least be able to read/update documents even if it didn't
own the websocket connection.

## Requirements

1. Node >=22.6.0
2. Go >=1.23.0
3. (development only) `protoc` >= 29.3

## Structure

- `proto` - protobuf definitions for go-plugin and Yjs operations
- `yjs-go-plugin` - a Node go-plugin that manages Yjs documents (in memory)
- `react-rich-collab` - a clone of a [lexical](https://github.com/facebook/lexical/tree/4bdf6148e9d3e439139f4f23429833a327b7ef30/examples/react-rich-collab) demo, only edits done were to point to the local Go server

## Running the demo

1. Run `cd yjs-go-plugin && npm install && cd ..` to set up the plugin dependencies
2. Run `go run main.go` to start the webserver
3. In a new tab, run `cd react-rich-collab && npm install && npm run dev` to start the frontend
4. Visit [http://localhost:5173](http://localhost:5173) in your browser and start editing

## Overview

The Go websocket server in this project dispatches incoming websocket messages
from Yjs clients to a Node subprocess using gRPC.

The basic flow works like:

1. Go server starts. go-plugin starts an instance of Node immidiately
2. A new client connects to Go
3. Go sends a SyncV1 message to Node over gRPC, gets back a response for the client to init
4. Go starts a timer and regularly sends the client the entire document as an encoded update
5. All future websocket messages from the client gets sent/brokered to Node via gRPC

To make this "feature complete", ignoring horizontal scaling, you'd want to:

- Ensure awareness updates are handled correctly. Disconnecting clients feel a bit buggy.
- Don't send updates on a timer
- Ensure sync steps are correct, not sending sync step 2 is probably bad
- Handle auth, persistence (only task that seems easy here, hah)

## Development

After editing [proto/yjs.proto](proto/yjs.proto), run these commands:

```bash
protoc --go_out=. --go-grpc_out=. proto/yjs.proto
cd yjs-go-plugin && npm run proto
```

Which will generate Go and Typescript definitions, respectively.
