'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var User = require('../../models/user');
var config = require('../../config');

router.post('/', function(req, res, next) {
  User.findOne({username: req.body.username})
    .select('password')
    .select('username')
    .exec(function(err, user) {
      if(err) {
        return next(err);
      } else if(!user) {
        return res.sendStatus(401);
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, valid) {
          if(err) {
            return next(err);
          } else if(!valid) {
            return res.sendStatus(401);
          } else {
            var token = jwt.encode({username: user.username}, config.secret);
            res.send(token);
          }
        });
      }
    });
});

module.exports = router;