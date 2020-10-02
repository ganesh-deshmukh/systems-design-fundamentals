// express = JS framework. sort of like what Rails is to Ruby
const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening on port 3000.'));

// API ENDPOINT
// when this endpoint gets hit, log header of request, then return response
app.get('/hello', (req, res) => {
  console.log(req.headers);
  res.send('Hello.\n')
});



// Notes on Nginx
// Docroot is: /usr/local /var/www
// The default port has been set in /usr/local / etc / nginx / nginx.conf to 8080 so that
// nginx can run without sudo.
// nginx will load all files in /usr/local / etc / nginx / servers /.
// nginx.conf file:

// events {}

// http {
//   // defining a server that points to localhost 3000
//   upstream nodejs-backend {
//     server localhost:3000;
//   }

//   server {
//     listen 8080;

//     // anytime endpoint with '/' is hit, so any url on this port
//     // have proxy set a new header (called systemsexpert-tutorial) on request 
//     // thats coming in set to true, then forward that request to nodejs-backend
//     location / {
//       proxy_set_header systemsexpert-tutorial true;
//         proxy_pass http://nodejs-backend;
//     }
//   }
// }

