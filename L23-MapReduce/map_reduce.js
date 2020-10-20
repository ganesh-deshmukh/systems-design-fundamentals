const fs = require('fs');                   // library allows us to read/write files

// Variable created in terminal when we run file?
// Ex. "host1"
const HOST = process.env.HOST;


// return contents of file located at path
function getMapInput(fileName) {

  // grabs path ex. "host1/latencies.txt"
  const path = `${HOST}/${fileName}`;

  return fs.readFileSync(path, 'utf-8');
}


// creates new file and tallys up according to under/over 10 seconds
function emitMapResult(key, value) {

  // creates a file path ex. 'host1/map_results/under_10_seconds.txt'
  const fileName = `${HOST}/map_results/${key}.txt`;

  // appends 1 to filename, then add new line
  fs.appendFileSync(fileName, value + '\n');
}


function getReduceInputs() {

  // grab filenames in 'map_results' folder
  const fileNames = fs.readdirSync(`map_results`, 'utf-8');
  const inputs = [];

  for (const fileName of fileNames) {
    const key = fileName.split('.')[0];
    const contents = fs.readFileSync(`map_results/${fileName}`, 'utf-8');
    inputs.push([key, contents.split('\n').filter(value => value !== '')]);
  }
  return inputs;
}


// writing final output
function emitReduceResult(key, value) {
  const fileName = `reduce_results/results.txt`;
  fs.appendFileSync(fileName, key + ' ' + value + '\n');
}


module.exports.getMapInput = getMapInput;
module.exports.emitMapresult = emitMapResult;
module.exports.getReduceInputs = getReduceInputs;
module.exports.emitReduceResult = emitReduceResult;