const express = require('express');
require('dotenv').config();

const urlCtrl = require('./ctrls/urlCtrl.js');

const app = express();
app.use(express.json());

app.use(express.static('public'));

app.get('/urls', urlCtrl.getAllUrls);
app.post('/short', urlCtrl.shortUrl);
app.get('/:shortUrl', urlCtrl.getFullUrl);
app.delete('/remove/:urlId', urlCtrl.removeUrl);

app.use((req, res, next) => {
  res.status(404).send({
    error: {
      message: 'Route not available'
    }
  });
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      message: error.message || 'Internal server error',
      ...error
    }
  });
});

module.exports = app;