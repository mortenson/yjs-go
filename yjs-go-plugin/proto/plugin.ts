import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GRPCStdioClient as _plugin_GRPCStdioClient, GRPCStdioDefinition as _plugin_GRPCStdioDefinition } from './plugin/GRPCStdio';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  plugin: {
    Empty: MessageTypeDefinition
    GRPCStdio: SubtypeConstructor<typeof grpc.Client, _plugin_GRPCStdioClient> & { service: _plugin_GRPCStdioDefinition }
    StdioData: MessageTypeDefinition
  }
}

