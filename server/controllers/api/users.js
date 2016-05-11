'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('./../../models/user');

router.get('/', function(req, res, next) {
  if(req.auth.username) {
    User.findOne({username: req.auth.username}, function(err, user) {
      if (err) {
        return next(err);
      } else {
        res.json(user);
      }
    });
  } else {
    return res.sendStatus(401);
  }
});

router.post('/', function(req, res, next) {
  var user = new User(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      user.save(function(err) {
        if (err) {
          return next(err);
        } else {
          return res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;