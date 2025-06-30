import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { hookStdout, hookStderr } from 'hook-std'
import { HealthImplementation } from 'grpc-health-check';
import type { ProtoGrpcType } from './proto/yjs.ts'
import type { ProtoGrpcType as PluginProtoGrpcType } from './proto/plugin.ts'
import type { TestResponse } from './proto/yjs/TestResponse.ts';
import type { TestRequest__Output } from './proto/yjs/TestRequest.ts'
import type { Empty, Empty__Output } from './proto/yjs/Empty.ts'
import type { StdioData } from './proto/plugin/StdioData.ts';
import type { SyncV1Request__Output } from './proto/yjs/SyncV1Request.ts';
import type { SyncV1Response } from './proto/yjs/SyncV1Response.ts';
import type { WebsocketMessageRequest__Output } from './proto/yjs/WebsocketMessageRequest.ts';
import type { WebsocketMessageResponse } from './proto/yjs/WebsocketMessageResponse.ts';
import type { SyncRequest__Output } from './proto/yjs/SyncRequest.ts';
import type { SyncResponse } from './proto/yjs/SyncResponse.ts';
import type { RemoveClientRequest__Output } from './proto/yjs/RemoveClientRequest.ts';

import { awarenessUpdate, removeClient, syncUpdate, syncV1, websocketMessage } from './yjs.ts';

const NETWORK_ADDR = '127.0.0.1:1234'
const CORE_PROTOCOL_VERSION = 1
const APP_PROTOCOL_VERSION = 1
const NETWORK_TYPE: 'unix' | 'tcp' = 'tcp'
const PROTOCOL: 'netrpc' | 'grpc' = 'grpc'

const packageDefinition = protoLoader.loadSync(import.meta.dirname + '/../proto/yjs.proto')
const proto = (grpc.loadPackageDefinition(
  packageDefinition
) as unknown) as ProtoGrpcType

const pluginPackageDefinition = protoLoader.loadSync(import.meta.dirname + '/../proto/plugin.proto')
const pluginProto = (grpc.loadPackageDefinition(
  pluginPackageDefinition
) as unknown) as PluginProtoGrpcType

const server = new grpc.Server()
server.addService(proto.yjs.YJS.service, {
  test: (call: grpc.ServerUnaryCall<TestRequest__Output, TestResponse>, callback: grpc.sendUnaryData<TestResponse>) => {
    const message = call.request.message
    callback(null, {message: `Got: ${message}`})
  },
  close: (call: grpc.ServerUnaryCall<Empty__Output, Empty>, callback: grpc.sendUnaryData<Empty>) => {
    process.exit(0)
  },
  syncV1: (call: grpc.ServerUnaryCall<SyncV1Request__Output, SyncV1Response>, callback: grpc.sendUnaryData<SyncV1Response>) => {
    callback(null, { message: syncV1(call.request.docname) })
  },
  websocketMessage: (call: grpc.ServerUnaryCall<WebsocketMessageRequest__Output, WebsocketMessageResponse>, callback: grpc.sendUnaryData<WebsocketMessageResponse>) => {
    callback(null, { message: websocketMessage(call.request.docname, call.request.message, call.request.origin) })
  },
  // todo: better name, maybe use stream for all of these
  sync: (call: grpc.ServerUnaryCall<SyncRequest__Output, SyncResponse>, callback: grpc.sendUnaryData<SyncResponse>) => {
    callback(null, {
      docMessage: syncUpdate(call.request.docname),
      awarenessMessage: awarenessUpdate(call.request.docname),
    })
  },
  removeClient: (call: grpc.ServerUnaryCall<RemoveClientRequest__Output, Empty>, callback: grpc.sendUnaryData<Empty>) => {
    callback(null, { message: removeClient(call.request.docname, call.request.origins) })
  },
})

server.addService(pluginProto.plugin.GRPCStdio.service, {
  streamStdio: (stream: grpc.ServerWritableStream<Empty__Output, StdioData>) => {
    hookStdout(output => {
      stream.write({ channel: 'STDOUT', 'data': Buffer.from(`[YJS OUT] ${output}`, 'utf-8') })
    })
    hookStderr(output => {
      stream.write({ channel: 'STDERR', 'data': Buffer.from(`[YJS ERROR] ${output}`, 'utf-8') })
    })
  },
})

// note: per https://github.com/hashicorp/go-plugin/issues/341, this doesn't really matter
const healthImpl = new HealthImplementation();
healthImpl.setStatus('plugin', 'SERVING')
healthImpl.addToServer(server);

server.bindAsync(NETWORK_ADDR, grpc.ServerCredentials.createInsecure(), (err, _) => {
  if (err != null) {
    console.error(err)
    process.exit(1)
  }
  // ref https://github.com/hashicorp/go-plugin/blob/main/docs/guide-plugin-write-non-go.md#4-output-handshake-information
  process.stdout.write(`${CORE_PROTOCOL_VERSION}|${APP_PROTOCOL_VERSION}|${NETWORK_TYPE}|${NETWORK_ADDR}|${PROTOCOL}\n`)
})
