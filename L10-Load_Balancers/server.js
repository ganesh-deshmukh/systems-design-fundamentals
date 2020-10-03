// express = JS framework. sort of like what Rails is to Ruby
const express = require('express');
const app = express();

// not hardcoding port, but using port defined in enviroment of server process
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}.`));

// API ENDPOINT
// when this endpoint gets hit, log header of request, then return response
app.get('/hello', (req, res) => {
  console.log(req.headers);
  res.send(`Hello from port ${port}.\n`)
});



// NOTES on Nginx
// - The default port has been set in /usr/local / etc / nginx / nginx.conf to 8080 so that
// - nginx can run without sudo.
// - nginx will load all files in /usr/local / etc / nginx / servers /.
// - to find config file, in terminal type in: code /usr/local/etc/nginx/nginx.conf
// nginx.conf file:

// events {}

// http {
//   // defining a server that points to localhost 3000 and 30001
//   // weighted round robin load balancer
//   // by default (round robin is used)
//   upstream nodejs-backend {
//     server localhost:3000 weight=3;    // majority of traffic will go here
//     server localhost:3001;
//   }

//   server {
//     listen 8081;

//     // anytime endpoint with '/' is hit, so any url on this port
//     // have proxy set a new header (called systemsexpert-tutorial) on request 
//     // thats coming in set to true, then forward that request to nodejs-backend
//     location / {
//       proxy_set_header systemsexpert-tutorial true;
//         proxy_pass http://nodejs-backend;
//     }
//   }
// }

