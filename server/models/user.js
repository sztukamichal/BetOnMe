'use strict';

var db = require('../db');
var UserSchema = db.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true, select: false},
  registerDate: {type: Date, required: true, default: Date.now},
  firstName: {type:String, required: true},
  lastName: {type:String, required: false},
  email: {type:String, required: true}
});

var User = db.model('User', UserSchema);

module.exports = User;