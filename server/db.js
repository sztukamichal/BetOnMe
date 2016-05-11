'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/betonme');
var db = mongoose.connection;
db.on('error', function() {
  console.log('Error while trying connect to database');
});
db.once('open', function() {
  console.log('Successfully connected to database');
});

module.exports = mongoose;