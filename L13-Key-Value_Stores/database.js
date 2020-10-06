const database = {
  ['index.html']: '<html>Hello World!</html',
};


module.exports.get = (key, callback) => {
  // simulate database retrieval time by delaying callback function by 3 seconds
  setTimeout( ()=> {
    callback(database[key]);
  }, 3000);
};