import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { YJSClient as _yjs_YJSClient, YJSDefinition as _yjs_YJSDefinition } from './yjs/YJS';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  yjs: {
    Empty: MessageTypeDefinition
    RemoveClientRequest: MessageTypeDefinition
    SyncRequest: MessageTypeDefinition
    SyncResponse: MessageTypeDefinition
    SyncV1Request: MessageTypeDefinition
    SyncV1Response: MessageTypeDefinition
    TestRequest: MessageTypeDefinition
    TestResponse: MessageTypeDefinition
    WebsocketMessageRequest: MessageTypeDefinition
    WebsocketMessageResponse: MessageTypeDefinition
    YJS: SubtypeConstructor<typeof grpc.Client, _yjs_YJSClient> & { service: _yjs_YJSDefinition }
  }
}

