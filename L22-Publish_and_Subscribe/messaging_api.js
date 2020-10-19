const axios = require('axios');                 // import JS library used to make HTTP requests (suports ES6 Promise API)
const WebSocket = require('ws');                // imports websocket library


// executes POST request to endpoint with specific topicID
function publish(message, topicId) {
  return axios.post(`http://localhost:3001/${topicId}`, message);
}


// creates a new web socket at a path w/ specific topicID
function subscribe(topicId) {
  return new WebSocket(`ws://locatlhost:3001/${topicId}`);
}


module.exports.publish = publish;
module.exports.subscribe = subscribe;