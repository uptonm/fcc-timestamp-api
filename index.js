const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(morgan('dev'));
app.use(cors());

getDateString = (req, res) => {
  let d;
  if (!req.params.date_string || req.params.date_string.length === 0) {
    d = new Date();
  } else {
    d = new Date(req.params.date_string);
  }
  if (d.toUTCString() === 'Invalid Date') {
    return res.status(400).send({
      error: 'Invalid Date'
    });
  }
  return res.status(200).send({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
};

app.get('/api/timestamp', getDateString);
app.get('/api/timestamp/:date_string', getDateString);
app.get('/api/whoami', (req, res) => {
  res.status(200).send(req.headers);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
