const axios = require('axios');                 // import JS library used to make HTTP requests (suports ES6 Promise API)
const WebSocket = require('ws');                // imports websocket library


// creates a websocket with our server
function createMessagingSocket() {
  return new WebSocket('ws:localhost:3001/messages');
}


// get all of the messages in the chat app
function getMessages() {
  return axios.get('http://localhost:3001/messages').then(res => res.data);
}


function sendMessage(message) {
  return axios.post('http://localhost:3001/messages', message);
}


module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessages = getMessages;
module.exports.sendMessage = sendMessage;