'use strict';

var express = require('express');
var router = express.Router();
var Team = require('./../../models/team');

router.get('/', function (req, res) {
  if(req.auth && req.auth.username) {
    Team.find({"_links.self.href":req.headers['x-selflink']}, function (err, team) {
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

module.exports = router;