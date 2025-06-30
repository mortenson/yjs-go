// Original file: ../proto/yjs.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _yjs_Empty, Empty__Output as _yjs_Empty__Output } from '../yjs/Empty';
import type { RemoveClientRequest as _yjs_RemoveClientRequest, RemoveClientRequest__Output as _yjs_RemoveClientRequest__Output } from '../yjs/RemoveClientRequest';
import type { SyncRequest as _yjs_SyncRequest, SyncRequest__Output as _yjs_SyncRequest__Output } from '../yjs/SyncRequest';
import type { SyncResponse as _yjs_SyncResponse, SyncResponse__Output as _yjs_SyncResponse__Output } from '../yjs/SyncResponse';
import type { SyncV1Request as _yjs_SyncV1Request, SyncV1Request__Output as _yjs_SyncV1Request__Output } from '../yjs/SyncV1Request';
import type { SyncV1Response as _yjs_SyncV1Response, SyncV1Response__Output as _yjs_SyncV1Response__Output } from '../yjs/SyncV1Response';
import type { TestRequest as _yjs_TestRequest, TestRequest__Output as _yjs_TestRequest__Output } from '../yjs/TestRequest';
import type { TestResponse as _yjs_TestResponse, TestResponse__Output as _yjs_TestResponse__Output } from '../yjs/TestResponse';
import type { WebsocketMessageRequest as _yjs_WebsocketMessageRequest, WebsocketMessageRequest__Output as _yjs_WebsocketMessageRequest__Output } from '../yjs/WebsocketMessageRequest';
import type { WebsocketMessageResponse as _yjs_WebsocketMessageResponse, WebsocketMessageResponse__Output as _yjs_WebsocketMessageResponse__Output } from '../yjs/WebsocketMessageResponse';

export interface YJSClient extends grpc.Client {
  Close(argument: _yjs_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  Close(argument: _yjs_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  Close(argument: _yjs_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  Close(argument: _yjs_Empty, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  
  RemoveClient(argument: _yjs_RemoveClientRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  RemoveClient(argument: _yjs_RemoveClientRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  RemoveClient(argument: _yjs_RemoveClientRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  RemoveClient(argument: _yjs_RemoveClientRequest, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  removeClient(argument: _yjs_RemoveClientRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  removeClient(argument: _yjs_RemoveClientRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  removeClient(argument: _yjs_RemoveClientRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  removeClient(argument: _yjs_RemoveClientRequest, callback: grpc.requestCallback<_yjs_Empty__Output>): grpc.ClientUnaryCall;
  
  Sync(argument: _yjs_SyncRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  Sync(argument: _yjs_SyncRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  Sync(argument: _yjs_SyncRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  Sync(argument: _yjs_SyncRequest, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  sync(argument: _yjs_SyncRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  sync(argument: _yjs_SyncRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  sync(argument: _yjs_SyncRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  sync(argument: _yjs_SyncRequest, callback: grpc.requestCallback<_yjs_SyncResponse__Output>): grpc.ClientUnaryCall;
  
  SyncV1(argument: _yjs_SyncV1Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  SyncV1(argument: _yjs_SyncV1Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  SyncV1(argument: _yjs_SyncV1Request, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  SyncV1(argument: _yjs_SyncV1Request, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  syncV1(argument: _yjs_SyncV1Request, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  syncV1(argument: _yjs_SyncV1Request, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  syncV1(argument: _yjs_SyncV1Request, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  syncV1(argument: _yjs_SyncV1Request, callback: grpc.requestCallback<_yjs_SyncV1Response__Output>): grpc.ClientUnaryCall;
  
  Test(argument: _yjs_TestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  Test(argument: _yjs_TestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  Test(argument: _yjs_TestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  Test(argument: _yjs_TestRequest, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  test(argument: _yjs_TestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  test(argument: _yjs_TestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  test(argument: _yjs_TestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  test(argument: _yjs_TestRequest, callback: grpc.requestCallback<_yjs_TestResponse__Output>): grpc.ClientUnaryCall;
  
  WebsocketMessage(argument: _yjs_WebsocketMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  WebsocketMessage(argument: _yjs_WebsocketMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  WebsocketMessage(argument: _yjs_WebsocketMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  WebsocketMessage(argument: _yjs_WebsocketMessageRequest, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  websocketMessage(argument: _yjs_WebsocketMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  websocketMessage(argument: _yjs_WebsocketMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  websocketMessage(argument: _yjs_WebsocketMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  websocketMessage(argument: _yjs_WebsocketMessageRequest, callback: grpc.requestCallback<_yjs_WebsocketMessageResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface YJSHandlers extends grpc.UntypedServiceImplementation {
  Close: grpc.handleUnaryCall<_yjs_Empty__Output, _yjs_Empty>;
  
  RemoveClient: grpc.handleUnaryCall<_yjs_RemoveClientRequest__Output, _yjs_Empty>;
  
  Sync: grpc.handleUnaryCall<_yjs_SyncRequest__Output, _yjs_SyncResponse>;
  
  SyncV1: grpc.handleUnaryCall<_yjs_SyncV1Request__Output, _yjs_SyncV1Response>;
  
  Test: grpc.handleUnaryCall<_yjs_TestRequest__Output, _yjs_TestResponse>;
  
  WebsocketMessage: grpc.handleUnaryCall<_yjs_WebsocketMessageRequest__Output, _yjs_WebsocketMessageResponse>;
  
}

export interface YJSDefinition extends grpc.ServiceDefinition {
  Close: MethodDefinition<_yjs_Empty, _yjs_Empty, _yjs_Empty__Output, _yjs_Empty__Output>
  RemoveClient: MethodDefinition<_yjs_RemoveClientRequest, _yjs_Empty, _yjs_RemoveClientRequest__Output, _yjs_Empty__Output>
  Sync: MethodDefinition<_yjs_SyncRequest, _yjs_SyncResponse, _yjs_SyncRequest__Output, _yjs_SyncResponse__Output>
  SyncV1: MethodDefinition<_yjs_SyncV1Request, _yjs_SyncV1Response, _yjs_SyncV1Request__Output, _yjs_SyncV1Response__Output>
  Test: MethodDefinition<_yjs_TestRequest, _yjs_TestResponse, _yjs_TestRequest__Output, _yjs_TestResponse__Output>
  WebsocketMessage: MethodDefinition<_yjs_WebsocketMessageRequest, _yjs_WebsocketMessageResponse, _yjs_WebsocketMessageRequest__Output, _yjs_WebsocketMessageResponse__Output>
}
