// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date';

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Dentro de tu manejo de ruta del servidor
app.get('/api/:date?', (req, res) => {
  let date = new Date(req.params.date);

  // Check if date is invalid, then try parsing without new Date()
  if (isInvalidDate(date)) {
    date = new Date(req.params.date);
  }

  // Check again if date is still invalid
  if (isInvalidDate(date)) {
    res.json({ error: 'Fecha inválida' });
    return;
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Use a default value if req.params.date is empty
app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(), utc: date.toUTCString()
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
