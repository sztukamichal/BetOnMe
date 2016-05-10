'use strict';

var express = require('express');
var router = express.Router();

var User = require('./../../models/users');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/register', function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, post) {
    if(err) {
      return next(err);
    }
    res.json(201, user);
  });

});

router.get('/', function(req, res) {
  res.send('Users default');
});

router.get('/about', function(req, res) {
  res.json({"name":"Adam"});
});

module.exports = router;