const database = require('./database');               // imports .get method from database.js file
const express = require('express');                   // imports express framework (like rails for ruby)

const app = express();
const cache = {};                                     // Create Cache Object

// API ENDPOINT
app.get('/nocache/index.html', (req, res) => {

  // get data from database object, then execute callback
  database.get('index.html', page => {

    // once we get the page, return the data to the client
    res.send(page);
  });
}); 


// API ENDPOINT
app.get('/withcache/index.html', (req, res) => {

  // if our html page already in cache
  if ('index.html' in cache) {

    // send data from cache to client, (skip database retrieval)
    res.send(cache['index.html']);
    return;
  }

  // get data from database object, and cache value in our server
  database.get('index.html', page => {
    cache['index.html'] = page;
    res.send(page);
  });
});


app.listen(3001, function() {
  console.log('Listening on port 3001!');
});


// NOTES/INSTRUCTIONS
// 1 in terminal, run: npm install express
// 2 in terminal, run: node server.js
// 3 in browser, type in: 'localhost:3001/nocache/index.html' and hit enter
//   - this is making a GET request (executing 1st API endpoint above)
//     to port 3001 to url path '/nocache/index.html'
//   - notice how it takes 3 seconds to load "Hello World!"
// 4 refresh browser
//  - notice it still takes 3 seconds to load, because there's no caching
// 
// 5 now type in the browser: 'localhost:3001/withcache/index.html' and hit enter
//  - the first time the page loads will take 3 seconds
// 6 refresh the browser, 
//  - notice how fast it took to reload!