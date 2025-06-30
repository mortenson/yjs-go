// Original file: ../proto/plugin.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _plugin_Empty, Empty__Output as _plugin_Empty__Output } from '../plugin/Empty';
import type { StdioData as _plugin_StdioData, StdioData__Output as _plugin_StdioData__Output } from '../plugin/StdioData';

export interface GRPCStdioClient extends grpc.Client {
  StreamStdio(argument: _plugin_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  StreamStdio(argument: _plugin_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  streamStdio(argument: _plugin_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  streamStdio(argument: _plugin_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_plugin_StdioData__Output>;
  
}

export interface GRPCStdioHandlers extends grpc.UntypedServiceImplementation {
  StreamStdio: grpc.handleServerStreamingCall<_plugin_Empty__Output, _plugin_StdioData>;
  
}

export interface GRPCStdioDefinition extends grpc.ServiceDefinition {
  StreamStdio: MethodDefinition<_plugin_Empty, _plugin_StdioData, _plugin_Empty__Output, _plugin_StdioData__Output>
}
