// This is a reverse proxy, acting on behalf of the database shards
const express = require('express');             // imports express framework (like rails for ruby)
const axios = require('axios');                 // import JS library used to make HTTP requests (suports ES6 Promise API)

const SHARD_ADDRESSES = [ 'http://localhost:3000', 'http://localhost:3001' ];
const SHARD_COUNT = SHARD_ADDRESSES.length;

const app = express();
app.use(express.json());


// returns either url localhost3000 or localhost3001
function getShardEndpoint(key) {
  const shardNumber = key.charCodeAt(0) % SHARD_COUNT;
  const shardAddress = SHARD_ADDRESSES[shardNumber];
  return `${shardAddress}/${key}`;  
}


// POST API ENDPOINT- forwards request to one of the two shards
// POST (create/update a resource)
app.post('/:key', (req, res) => {
  const shardEndpoint = getShardEndpoint(req.params.key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  axios
    .post(shardEndpoint, req.body)
    .then(innerRes => {
      res.send();
    });
});


// GET API ENDPOINT- forwards request ot one of the two shards
app.get('/:key', (req, res) => {
  const shardEndpoint = getShardEndpoint(req.params.key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  axios
    .get(shardEndpoint)
    .then(innerRes => {
      if (innerRes.data === null) {
        res.send('null');
        return;
      }
      res.send(innerRes.data);
    });
});


app.listen(8000, ()=> {
  console.log('Listening on port 8000!');
});