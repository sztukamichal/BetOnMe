'use strict';

var db = require('../db');
var User = db.model('User', {
  username: {type: String, required: true},
  password: {type: String, required: true},
  registerDate: {type: Date, required: true, default: Date.now}
});

module.exports = User;