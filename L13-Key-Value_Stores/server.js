const database = require('./database');               // imports .get method from database.js file
const express = require('express');                   // imports express framework (like rails for ruby)
const redis = require('redis').createClient();        // imports redis library (NoSQL database, in-memory key/value store)

const app = express();


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

  redis.get('index.html', (err, redisRes) => {

    // if our html page already in redis cache
    if (redisRes) {   // redisRes is the html value we created in database.js

      // send data from cache to client, (skip database retrieval)
      res.send(redisRes);
      return;
    }
  });

  // get data from database object, and cache value in our server
  database.get('index.html', page => {

    // store page from database into redis, set 'index.html' as the key
    // EX = expiration, so after 10 seconds, this key/value will expire 
    //   (removed from store)
    redis.set('index.html', page, 'EX', 10);
    res.send(page);
  });
});


app.listen(3001, function () {
  console.log('Listening on port 3001!');
});


// NOTES/INSTRUCTIONS
// - to end redis server, run: brew services stop redis
// https://tableplus.com/blog/2018/10/how-to-start-stop-restart-redis.html
// 1 in terminal, run: npm install express
// 2 in terminal, run: brew install redis
// 3 in terminal, run: brew services start redis
// 4 in terminal, run: node server.js
// 5 in browser, type in: 'localhost:3001/nocache/index.html' and hit enter
//   - this is making a GET request (executing 1st API endpoint above)
//     to port 3001 to url path '/nocache/index.html'
//   - notice how it takes 3 seconds to load "Hello World!"
// 6 refresh browser
//  - notice it still takes 3 seconds to load, because there's no caching
// 
// 7 now type in the browser: 'localhost:3001/withcache/index.html' and hit enter
//  - the first time the page loads will take 3 seconds
// 8 refresh the browser, 
//  - notice how fast it took to reload!
//
// NOTE after 10 seconds, server crashes?!?