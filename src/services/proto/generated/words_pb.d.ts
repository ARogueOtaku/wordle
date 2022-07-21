import * as jspb from 'google-protobuf'



export class Word extends jspb.Message {
  getWord(): string;
  setWord(value: string): Word;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Word.AsObject;
  static toObject(includeInstance: boolean, msg: Word): Word.AsObject;
  static serializeBinaryToWriter(message: Word, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Word;
  static deserializeBinaryFromReader(message: Word, reader: jspb.BinaryReader): Word;
}

export namespace Word {
  export type AsObject = {
    word: string,
  }
}

export class WordRequest extends jspb.Message {
  getLength(): number;
  setLength(value: number): WordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WordRequest): WordRequest.AsObject;
  static serializeBinaryToWriter(message: WordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WordRequest;
  static deserializeBinaryFromReader(message: WordRequest, reader: jspb.BinaryReader): WordRequest;
}

export namespace WordRequest {
  export type AsObject = {
    length: number,
  }
}

