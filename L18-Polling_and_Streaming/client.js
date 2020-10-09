const helpers = require('./helpers');
const messagingApi = require('./messaging_api');
const readline = require('readline');                 // library that allows us to read input from terminal

displayedMessages = {};


// set up our terminal object
const terminal = readline.createInterface({
  input: process.stdin,
});


// whenever we type something in the terminal and press enter, do call back
terminal.on('line', text => {
  const username = process.env.NAME;

  // all messages almost have unique ID
  const id = helpers.getRandomInt(100000);

  // set message to be already displayed
  displayedMessages[id] = true;

  // create message object
  const message = { id, text, username };

  // send message to api
  messagingApi.sendMessage(message);
});


// logs message to console
function displayMessage(message) {
  console.log(`> ${message.username}: ${message.text}`);
  displayedMessages[message.id] = true;
}


async function getAndDisplayMessages() {

  // get messages by calling API
  const messages = await messagingApi.getMessages();

  // for every message
  for (const message of messages) {

    // check if message has already been displayed
    const messageAlreadyDisplayed = message.id in displayedMessages;

    // if message not displayed, display message
    if (!messageAlreadyDisplayed) displayMessage(message);
  }
}


// every 3 seconds, getAndDisplayMessages
function pollMessages() {
  setInterval(getAndDisplayMessages, 3000);
}


function streamMessages() {

  // create websocket to establish connection with server
  const messagingSocket = messagingApi.createMessagingSocket();

  // listen for messages, when we get one, parse it, and display it
  messagingSocket.on('message', data => {
    const message = JSON.parse(data);
    const messageAlreadyDisplayed = message.id in displayedMessages;
    if (!messageAlreadyDisplayed) displayMessage(message);
  });
}


// we will declare process enviroment variable MODE in the terminal
if (process.env.MODE === 'poll') {
  getAndDisplayMessages();
  pollMessages();

} else if (process.env.MODE === 'stream') {
  // 1) This code gets executed first after we run this file in node
  getAndDisplayMessages();
  streamMessages();
}