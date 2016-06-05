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

router.get('/fixtures/:seasonId', function (req, res) {
  if(req.auth && req.auth.username) {
    if(req.query.timeFrame !== undefined) {
      SoccerSeason.getFixturesByDate(req.query.timeFrame, function (err, result) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.json(result);
      });
    } else {
      SoccerSeason.find({"id":req.params.seasonId}, {"fixtures":1}, function (err, seasons) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.json(seasons);
        }
      });
    }
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;