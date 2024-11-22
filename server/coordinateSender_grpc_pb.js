// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var coordinateSender_pb = require('./coordinateSender_pb.js');

function serialize_coordinateSender_LocationRequest(arg) {
  if (!(arg instanceof coordinateSender_pb.LocationRequest)) {
    throw new Error('Expected argument of type coordinateSender.LocationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coordinateSender_LocationRequest(buffer_arg) {
  return coordinateSender_pb.LocationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_coordinateSender_LocationResponse(arg) {
  if (!(arg instanceof coordinateSender_pb.LocationResponse)) {
    throw new Error('Expected argument of type coordinateSender.LocationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_coordinateSender_LocationResponse(buffer_arg) {
  return coordinateSender_pb.LocationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Define the service
var coordinateSenderServiceService = exports.coordinateSenderServiceService = {
  sendLocation: {
    path: '/coordinateSender.coordinateSenderService/SendLocation',
    requestStream: false,
    responseStream: false,
    requestType: coordinateSender_pb.LocationRequest,
    responseType: coordinateSender_pb.LocationResponse,
    requestSerialize: serialize_coordinateSender_LocationRequest,
    requestDeserialize: deserialize_coordinateSender_LocationRequest,
    responseSerialize: serialize_coordinateSender_LocationResponse,
    responseDeserialize: deserialize_coordinateSender_LocationResponse,
  },
};

exports.coordinateSenderServiceClient = grpc.makeGenericClientConstructor(coordinateSenderServiceService);
