'use strict';

var db = require('../db');
var User = db.model('User', {
  username: {type: String, required: true},
  password: {type: String, required: true, select: false},
  registerDate: {type: Date, required: true, default: Date.now},
  firstName: {type:String, required: true},
  lastName: {type:String, required: false},
  email: {type:String, required: true}
});

module.exports = User;