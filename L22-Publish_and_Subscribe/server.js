const express = require('express');          // imports express framework (like rails for ruby)
const expressWs = require('express-ws');

const app = express();
expressWs(app);

// keys will be topicIds, there will be array values for every topicId
// arrays will contain web sockets?
const sockets = {};

app.use(express.json());

app.listen(3001, () => {
  console.log('Listening on port 3001!');
});


// POST API END POINT
// takes in a unique topic ID
app.post('/:topicId', (req, res) => {

  // grab topicId from request parameters
  const { topicId } = req.params;

  // grab message
  const message = req.body;

  const topicSockets = sockets[topicId] || [];

  for (const socket of topicSockets) {

    // send message that was sent in publish method (messaging_api.js)
    socket.send(JSON.stringify(message));
  }
});


// Web Socket
app.ws('/:topicId', (socket, req) => {
  const {topicId } = req.params;

  // check if topicId exists in JS object we defined in memory above
  if (!sockets[topicId]) sockets[topicId] = [];

  const topicSockets = sockets[topicId];

  topicSockets.push(socket);

  // when the socket closes the connection, we remove it from
  // the topic sockets array
  socket.on('close', () => {
    topicSockets.splice(topicSockets.indexOf(socket), 1);
  });
});