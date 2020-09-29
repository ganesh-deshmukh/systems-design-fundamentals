// LESSON 4 NOTES- NETWORK PROTOCOLS
// - note this request/response is incomplete (only shows impt info)
const httpRequest = {
  host: 'localhost',        // describes destination server request is going to
  port: 8080,               // describes destination server request is going to
  method: 'POST',           // describe purpose of request ex. GET, PUT, DELETE
  path: '/payments',        // different server code will run depending on path
  headers: {                // contains info/meta data about request
    'content-type': 'application/json',
    'content-length': 51,
  },
  body: '{"data": "This is a piece of data in JSON format."}'
}

const httpResponse = {
  statusCode: 200,          // describe the type of response (ex. 404 not found)
  headers: {
    'access-control-allow-origin': 'https://www.algoexpert.io',
    'content-type': 'application/json',
  },
  body: '{}'
}

