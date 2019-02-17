// server.js
const express = require('express');
const WebSocket = require('ws');
const { msgWithId, numberOfUsersMsg, assignUserColor} = require('./helper_functions');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // assigns user color
  ws.send(assignUserColor());

  // broadcasts change in number of users
  wss.broadcast(numberOfUsersMsg(wss.clients.size));

  // receives a message, adds an id and broadcasts it to all users
  ws.on('message', (message) => {
    msgWithId(JSON.parse(message))
    .then( (jsonMsg) => {
      wss.broadcast(jsonMsg);
    })
    .catch( (err) => {
      console.error(err);
      ws.send(JSON.stringify({
        type: 'incomingNotification',
        content: 'Gif failed to load. Please try again'
      }));
    });
  })
  
  // Set up a callback for when a client closes the socket
  ws.on('close', () => {
    console.log('Client disconnected');
    // broadcasts change in users once the client closes connection
    wss.broadcast(numberOfUsersMsg(wss.clients.size));
    
  })
});

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

