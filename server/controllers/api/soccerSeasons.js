'use strict';

var express = require('express');
var router = express.Router();
var SoccerSeason = require('./../../models/soccerseason');

router.get('/', function (req, res) {
  if (req.auth && req.auth.username) {
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

router.get('/fixtures', function (req, res) {
  if (req.auth && req.auth.username) {
    SoccerSeason.getFixturesByDate(undefined, req.query.timeFrame, req.query.leagueCodes, function (err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(result);
    });
  } else {
    return res.sendStatus(401);
  }
});

router.get('/fixture', function (req, res) {
  if(req.auth && req.auth.username) {
    SoccerSeason.getFixtureByLink(req.headers['x-selflink'], function (err, team) {
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

router.get('/fixtures/:seasonId', function (req, res) {
  if (req.auth && req.auth.username) {
    if (req.query.timeFrame !== undefined) {
      SoccerSeason.getFixturesByDate(req.params.seasonId, req.query.timeFrame, undefined, function (err, result) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.json(result);
      });
    } else {
      SoccerSeason.find({"id": req.params.seasonId}, {"fixtures": 1}, function (err, seasons) {
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