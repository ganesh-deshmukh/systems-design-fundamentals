const messagingApi = require('./messaging_api');
const readline = require('readline');                 // allows us to read input from terminal


const TOPIC_ID = process.env.TOPIC_ID;

const terminal = readline.createInterface({
  input: process.stdin,
});


// create event listener on terminal input, execute callback
terminal.on('line', text => {
  const name = process.env.Name;

  const message = { name, text };

  messagingApi.publish(message, TOPIC_ID);
});


