import { readdirSync } from 'fs';
import * as path from 'path';

import { Type, Root } from 'protobufjs';

interface ResultSuccess<T> {
  data: T;
  error: null;
}

interface ResultFailure {
  data: null;
  error: Error;
}

export type Result<T> = ResultSuccess<T> | ResultFailure;

export class ProtoMessage<T> {
  private _type: Type;

  constructor(type: Type) {
    this._type = type;
  }

  encode(obj: T): Buffer {
    const uint8Array = this._type.encode(obj).finish();
    return Buffer.from(uint8Array);
  }

  decode(buffer: Buffer): Result<T> {
    try {
      return {
        data: this.dangerouslyDecode(buffer),
        error: null,
      };
    } catch (e) {
      return {
        data: null,
        error: e,
      };
    }
  }

  dangerouslyDecode(buffer: Buffer): T {
    return this._type.toObject(this._type.decode(buffer), {
      enums: Number,
      arrays: true,
    }) as T;
  }
}

export class ProtoRoot {
  private _root: Root;
  private readonly _typeCache: { [key: string]: ProtoMessage<any> };

  constructor(protoFiles: string[]) {
    this._root = new Root();
    this._typeCache = {};
    this._loadProtoFiles(protoFiles);
  }

  loadProtoMessage<T>(messageName: string): ProtoMessage<T> {
    if (!this._typeCache[messageName]) {
      this._typeCache[messageName] = new ProtoMessage(this._root.lookupType(messageName));
    }

    return this._typeCache[messageName];
  }

  private _loadProtoFiles(filePaths: string[]): void {
    this._root.loadSync(filePaths);
  }

  static createForDirectory(directory: string): ProtoRoot {
    const protoFiles: string[] = [];
    readdirSync(path.resolve(directory), { withFileTypes: true }).forEach((file) => {
      protoFiles.push(path.join(directory, file.name));
    });

    return new ProtoRoot(protoFiles);
  }
}
