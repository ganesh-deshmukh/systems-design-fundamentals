// generate a random integer (used to make an ID of a message)
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.getRandomInt = getRandomInt;