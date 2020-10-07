const express = require('express');           // imports express framework (like rails for ruby)
const fs = require('fs');                     // imports file system module that lets you work with files (can create/read/write/delete files)

const PORT = process.env.PORT;                // process = global obj w/ info like which node version, what editor/path/user
const DATA_DIR = process.env.DATA_DIR;

const app = express();
app.use(express.json());


// API POST ENDPOINT (create/update a resource)
app.post('/:key', (req, res) => {
  const { key } = re.params;
  console.log(`Storing data at key ${key}.`);
  const destinationFile = `${DATA_DIR}/${key}`;
  fs.writeFileSync(destinationFile, req.body.data);
  res.send();
});


// API GET ENDPOINT
app.get('/:key', (req, res) => {
  const { key } = req.params;
  console.log(`Retrieving data from key ${key}.`);
  const destinationFile = `${DATA_DIR}/${key}`;

  try {
    const data = fs.readFileSync(destinationFile);
    res.send(data);

  } catch(e) {
    res.send('null');
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}~`);
});

// NOTE each of the two folders/directories (aedb_data_0, and aedb_data_1)
// are a database shard