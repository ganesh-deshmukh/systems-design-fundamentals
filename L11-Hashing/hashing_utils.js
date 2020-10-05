// returns integer value
// note* below taken from stack overflow
// we usually never write our own hashing function, but use indsutry used ones
function hashString(string) {
  let hash = 0;
  
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    let charCode = string.charCodeAt(i);

    hash = (hash << 5) - hash + charCode;

    hash |= 0;
  }

  return hash;
}


// trivial way below (nums are just for example in hashing_utils.js file)
// also wouldnt usually write your own ranking function
function computeScore(username, server) {
  const usernameHash = hashString(username);
  const serverHash = hashString(server);
  return (usernameHash * 13 + serverHash * 11) % 67;
}


module.exports.hashString = hashString;
module.exports.computeScore = computeScore;

