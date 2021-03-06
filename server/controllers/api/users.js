'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('./../../models/user');

router.get('/', function(req, res, next) {
  if(req.auth && req.auth.username) {
    User.findOne({username: req.auth.username})
      .populate({
        path: 'notifications.notifiedBy',
        select: 'username firstName lastName email avatar'
      })
      .populate({
        path: 'notifications.tournament',
        select: 'name description'
      })
      .exec(function(err, user) {
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

router.get('/getUsers', function(req, res, next) {
  if(req.auth && req.auth.username) {
    User.find({}, {password:0, registerDate:0, __v:0, notifications: 0}, function(err, user) {
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

router.post('/update/',function (req, res, next) {
  if(req.auth && req.auth.username) {
    User.update({username:req.auth.username}, {firstName: req.body.firstName, lastName: req.body.lastName, email:req.body.email, avatar:req.body.avatar}, {multi:false}, function (err, raw) {
      if(err) {
        return res.sendStatus(500);
      }
    });
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

router.post('/', function(req, res, next) {
  function createNewUser() {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      } else {
        user.password = hash;
        user.save(function (err) {
          if (err) {
            return next(err);
          } else {
            return res.sendStatus(201);
          }
        });
      }
    });
  }
  var user = new User(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
  User.findOne({username: user.username}, function (err, user) {
    if (err) {
      return next(err);
    } else if (user === null){
      createNewUser();
    } else {
      res.sendStatus(409);
    }
  });
});

module.exports = router;