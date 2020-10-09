const express = require('express');          // imports express framework (like rails for ruby)
const expressWs = require('express-ws');

const app = express();
expressWs(app);

const messages = [{id:0, text:'Welcome!', username:'Chat Room'}];
const sockets = [];                         // each socket corresponds to a user?

app.use(express.json());


app.listen(3001, () => {
  console.log('Listening on port 3001!');
});


// GET API END POINT- returns messages in JSON format
app.get('/messages', (req, res) => {
  res.json(messages);
});


// POST API END POINT- 
app.post('/messages', (req, res) => {
  const message = req.body;

  // add message to array of messages (in memory on server)
  messages.push(message);

  // for each user, send them the message in json string format
  for (const socket of sockets) {

    // pushing message to every user/client
    socket.send(JSON.stringify(message));
  }
});


// WEB SOCKET API END POINT- when server receives request to open up a socket
app.ws('/messages', socket => {

  // add user/client as a socket to array in memory
  sockets.push(socket);

  // if the client ever closes connection, remove socket from list of sockets
  socket.on('close', () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});