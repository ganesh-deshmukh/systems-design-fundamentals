const database = require('./database');
const express = require('express');                   // imports express framework (like rails for ruby)
const app = express();

app.listen(3000, () => console.log('Listening on port 3000.'));

// Keep a hash table of the previous access time for each user
const accesses = {};      // IN MEMORY- DONT DO THIS ON LARGE SCALE SYSTEMS


// API END POINT- when someone issues a GET request to '/index.html', do function
app.get('/index.html', function(req, res) {
  const { user } = req.headers;   

  // check hash table if user is in there
  if (user in accesses) {

    // lookt at previous access time for that user
    const previousAccessTime = accesses[user];

    // RATE LIMITing- Limit to 1 request every 5 seconds
    if (Date.now() - previousAccessTime < 5000) {
      res.status(429).send('Too many requests.\n');
      return;
    }
  }

  // Serve the page and store this access time
  database.get('index.html', page => {

    // store user and current time in accesses hash table
    accesses[user] = Date.now();

    // send html page back to client
    res.send(page + '\n');
  });
});


// INSTRUCTIONS:
// 1) install express:
//    npm install express
// 2) set up node server:
//    node server.js
// 3) in another terminal window (client):
//    curl -H 'user: clement' http://localhost:3000/index.html
// - curl = Client URL = command that lets you make HTTP requests with different options 
// - the "-H" options sets a header in the request
// 4) 