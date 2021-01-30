const express = require('express');
require('dotenv').config();

const urlCtrl = require('./ctrls/urlCtrl.js');

const app = express();
app.use(express.json());

app.post('/short', urlCtrl.shortUrl);

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      message: error.message || 'Internal server error',
      error
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({
    message: 'Server error',
    error: err
  });
});

module.exports = app;