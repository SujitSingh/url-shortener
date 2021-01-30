const mongoose = require('mongoose');
const config = require('./config.js');

function connectMongoDB() {
  return mongoose.connect(config.mongoDBPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

module.exports = {
  mongoConnect: connectMongoDB
};