const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  expireAt:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Url', UrlSchema);
