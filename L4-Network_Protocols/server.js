// express = JS framework. sort of like what Rails is to Ruby
const express = require('express');   
const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Listening on port 3000.'));

// GET API end point @ '/hello'
// call back function is executed when GET request is received
// cb code runs on server
app.get('/hello', (req, res) => {         
  console.log('Headers:', req.headers);   
  console.log('Method:', req.method);
  res.send('Received GET request!\n');
});


// POST API endpoint @ '/hello'
app.post('/hello', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Method:', req.method);
  console.log('Body:', req.body);
  res.send('Received POST request!\n');
});