'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/betonme', function() {
  console.log('Successfully connect to database...');
});


module.exports = mongoose;