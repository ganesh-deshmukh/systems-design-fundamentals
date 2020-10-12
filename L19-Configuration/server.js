const fs = require('fs');                             // imports file system module that lets you work with files (can create/read/write/delete files)
const express = require('express');                   // imports express framework (like rails for ruby)
const app = express();

// read static_config.json file, and create a JS object version of it
const staticConfig = JSON.parse(fs.readFileSync('static_config.json'));

app.listen(3000, () => console.log('Listening on port 3000'));

// API GET ENDPOINT- when this gets hit, do callback function
app.get('/static/new_feature.html', function(req, res) {

  // if new feature (key/val defined in config file) has not been launched
  if (!staticConfig.newFeatureLaunched) {

    // return an error
    res.status(401).send('Unauthorized.\n');
    return;
  }

  // otherwise, return new feature (simple html page)
  res.send('<html>Goodbye World!</html>\n');
});


// note if we change config file parameter to false, and re run the curl command, 
// we still wont see any changes (app has to be redeployed)