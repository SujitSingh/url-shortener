const mongoose = require('mongoose');
const nanoid = require('nanoid');
const idCharLen = 11;

const urlSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  fullUrl: { type: String, required: true },
  shortUrl: {
    type: String,
    required: true,
    default: () => nanoid.nanoid(idCharLen)
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('model', urlSchema, 'Urls');