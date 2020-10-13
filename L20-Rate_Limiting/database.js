const database = {
  ['index.html']: '<html>Hello World!</html>'
};


// export a method called "get"
module.exports.get = (key, callback) => {
  
  // after 1second, execute callback function and pass in value at key in db
  setTimeout( () => {
    callback(database[key]);
  }, 1000);   // simulate database time retrieval
};