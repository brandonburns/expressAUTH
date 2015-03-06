'use strict';

var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
  unicornName: String
});

module.exports = mongoose.model('Unicorn', unicornSchema);