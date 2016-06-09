'use strict';

var express = require('express');
var router = express.Router();
var Tournament = require('./../../models/tournament');

router.get('/', function (req, res) {
  if(req.auth && req.auth.username) {
    Tournament.find({}, function (err, team) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(team);
      }
    });
  } else {
    return res.sendStatus(401);
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  var tournament = new Tournament(
    req.body);
  tournament.save(function (err) {
    if (err) {
      return next(err);
    } else {
      return res.sendStatus(201);
    }
  });
});

module.exports = router;