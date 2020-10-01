// Database object, has just 1 key, and returns a very basic html page
const database = {
  ['index.html']: '<html>Hello World!</html>'
};


// .get method- after 3 seconds (emulating a database read), do callback
// gets html page in database
module.exports.get = (key, callback) => {
  setTimeout(() => {
    callback(database[key]);
  }, 3000);
};