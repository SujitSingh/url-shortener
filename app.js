const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).send({
    message: 'Server error',
    error: err
  });
});

module.exports = app;