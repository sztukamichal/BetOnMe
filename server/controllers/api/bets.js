'use strict';

var express = require('express');
var router = express.Router();
var TypeOfBet = require('./../../models/typeOfBet');

router.get('/getTypes', function(req, res) {
  if (req.auth && req.auth.username) {
    TypeOfBet.find({}, function(err, typeOfBets) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(typeOfBets);
      }
    });
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;