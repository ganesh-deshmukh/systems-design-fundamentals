const utils = require('./hashing_utils');

const serverSet1 = [
  'server0',
  'server1',
  'server2',
  'server3',
  'server4',
  'server5'
];

const serverSet2 = [
  'server0',
  'server1',
  'server2',
  'server3',
  'server4'
];

// CLIENTS
const usernames = [
  'username0',
  'username1',
  'username2',
  'username3',
  'username4',
  'username5',
  'username6',
  'username7',
  'username8',
  'username9'
];


// NAIVE HASHING, chooses server based on modulo rule and number of servers
function pickServerSimple(username, servers) {

  // hash username
  const hash = utils.hashString(username);

  // pick server according to modulo rule
  return servers[hash % servers.length];
}


// RENDEZVOUS HASHING- chooses server based on highest ranking server
function pickServerRendezvous(username, servers) {
  let maxServer = null;
  let maxScore = null;

  // loop through all servers
  for (const server of servers) {

    // calculate score for server
    const score = utils.computeScore(username, server);

    // keep updating the maxScore and the server associated with that maxScore
    if (maxScore === null || score > maxScore) {
      maxScore = score;
      maxServer = server;
    }
  }

  return maxServer;
}


console.log('Simple Hashing Strategy:');
// loop through usernames (clients)
for (const username of usernames) {

  // what would a server be if we have all servers
  const server1 = pickServerSimple(username, serverSet1);

  // what would a server be if we "removed" one server
  const server2 = pickServerSimple(username, serverSet2);

  const serversAreEqual = server1 === server2;

  console.log(`${username}: ${server1} => ${server2} | equal: ${serversAreEqual}`);
}


console.log('\nRendezvous Hashing Strategy');
// loop through usernames (clinets);
for (const username of usernames) {

  // what would a server be if we have all servers
  const server1 = pickServerRendezvous(username, serverSet1);

  // what would a server be if we "removed" one server
  const server2 = pickServerRendezvous(username, serverSet2);

  const serversAreEqual = server1 === server2;
  console.log(`${username}: ${server1} => ${server2} | equal ${serversAreEqual}`);
}


// Note how "removing" a server (second server column) minimizes the new changes 
// for the rendezvous selection strategy
// OUTPUT:
//
// Simple Hashing Strategy:
// username0: server2 => server0 | equal: false
// username1: server3 => server1 | equal: false
// username2: server4 => server2 | equal: false
// username3: server5 => server3 | equal: false
// username4: server0 => server4 | equal: false
// username5: server1 => server0 | equal: false
// username6: server2 => server1 | equal: false
// username7: server3 => server2 | equal: false
// username8: server4 => server3 | equal: false
// username9: server5 => server4 | equal: false

// Rendezvous Hashing Strategy
// username0: server5 => server4 | equal false
// username1: server4 => server4 | equal true
// username2: server2 => server2 | equal true
// username3: server1 => server1 | equal true
// username4: server0 => server0 | equal true
// username5: server5 => server4 | equal false
// username6: server4 => server4 | equal true
// username7: server3 => server3 | equal true
// username8: server1 => server1 | equal true
// username9: server0 => server0 | equal true