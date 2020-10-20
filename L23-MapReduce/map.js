const mapReduce = require('./map_reduce');


function map(text) {

  // create array of texts separated by new line
  const lines = text.split('\n');

  for (const line of lines) {

    // convert each text in array to integer
    const latency = parseInt(line);

    if (latency < 10000) {

      // tally up counts in 'under_10_seconds' file
      mapReduce.emitMapResult('under_10_seconds', 1);

    } else {
      mapReduce.emitMapResult('over_10_seconds', 1);
    }
  }
}


// get contents of 'latencies.txt' file and store them in mapInput
const mapInput = mapReduce.getMapInput('latencies.txt');

// run map function on file contents
map(mapInput);