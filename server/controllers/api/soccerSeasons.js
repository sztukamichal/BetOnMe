'use strict';

var express = require('express');
var router = express.Router();
var SoccerSeason = require('./../../models/soccerseason');

router.get('/', function (req, res) {
  if(req.auth && req.auth.username) {
    SoccerSeason.findAllSeasonsWithoutFixtures(function (err, seasons) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(seasons);
      }
    });
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;