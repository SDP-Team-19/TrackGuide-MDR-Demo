/* 

    This file is the backend for script.js. It is responsible from taking the coordinate data
    from client.py by using gRPC. Once recieved it send the data through websocket
    to script.js so it can display the path taken. 

    run 2nd after script.js command from root:     node ./server/server.js

*/


const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const WebSocket = require('ws');

// loading the proto file for gRPC communication
const packageDefinition = protoLoader.loadSync('./proto/coordinateSender.proto'); // Adjust path as needed
const exampleProto = grpc.loadPackageDefinition(packageDefinition).coordinateSender;


const wsServer = new WebSocket.Server({ port: 8080 }); // initializing the websocket server
console.log('WebSocket server running on ws://localhost:8080');


const clients = []; //keep track of websocket clients
wsServer.on('connection', (ws) => {
  clients.push(ws);
  console.log('New WebSocket client connected');
  ws.on('close', () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

function forwardToClients(latitude, longitude) { 
    /* This function takes the gRPC function and sends it to indivual clients through
    websocket */

  const message = JSON.stringify({ latitude, longitude });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// gRPC implementation for handling the location request
function sendLocation(call, callback) {
/** This function gets the gRPC data and prepares it for the websocket  */
  const { latitude, longitude } = call.request;
  console.log(`Received location: Latitude = ${latitude}, Longitude = ${longitude}`);
  
  //forward the received coordinates to WebSocket clients
  forwardToClients(latitude, longitude);
  
  //prepare the response message
  const replyMessage = `Location received: Latitude = ${latitude}, Longitude = ${longitude}`;
  console.log(`Sending response to client: ${replyMessage}`);
  
  //send the response back to the client using the callback
  callback(null, { reply: replyMessage });
}

//starts the gRPC server
const server = new grpc.Server();
server.addService(exampleProto.coordinateSenderService.service, { SendLocation: sendLocation });

const PORT = 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${PORT}`);
  server.start();
});