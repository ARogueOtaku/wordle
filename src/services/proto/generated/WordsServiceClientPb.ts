/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as words_pb from './words_pb';


export class WordServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorgetWord = new grpcWeb.MethodDescriptor(
    '/WordService/getWord',
    grpcWeb.MethodType.UNARY,
    words_pb.WordRequest,
    words_pb.Word,
    (request: words_pb.WordRequest) => {
      return request.serializeBinary();
    },
    words_pb.Word.deserializeBinary
  );

  getWord(
    request: words_pb.WordRequest,
    metadata: grpcWeb.Metadata | null): Promise<words_pb.Word>;

  getWord(
    request: words_pb.WordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: words_pb.Word) => void): grpcWeb.ClientReadableStream<words_pb.Word>;

  getWord(
    request: words_pb.WordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: words_pb.Word) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/WordService/getWord',
        request,
        metadata || {},
        this.methodDescriptorgetWord,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/WordService/getWord',
    request,
    metadata || {},
    this.methodDescriptorgetWord);
  }

}

