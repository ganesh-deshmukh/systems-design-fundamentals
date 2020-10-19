const messagingApi = require('./messaging_api');

// this is manually defined in the terminal right when we run this file
const TOPIC_ID = process.env.TOPIC_ID;


function displayMessage(message) {
  console.log(`> ${message.name}: ${message.text}`);
}


function streamMessages() {
  const messagingSocket = messagingApi.subscribe(TOPIC_ID);

  messagingSocket.on('message', (data) => {
    const message = JSON.parse(data);
    displayMessage(message);
  });
}

streamMessages();