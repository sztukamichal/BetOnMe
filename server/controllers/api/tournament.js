'use strict';

var express = require('express');
var router = express.Router();
var Tournament = require('./../../models/tournament');
var User = require('./../../models/user');

router.get('/', function(req, res) {
  if (req.auth && req.auth.username) {
    Tournament.find({})
      .populate({
        path: 'owner',
        select: 'username firstName lastName email avatar'
      })
      .populate({
        path: 'participants.user',
        select: 'username firstName lastName email avatar'
      })
      .exec(function(err, team) {
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

router.get('/test', function(req, res) {
  Tournament.find({name: 'nowy turniej'})
    .populate({
      path: 'owner',
      select: 'username firstName lastName email avatar'
    })
    .populate({
      path: 'participants.user',
      select: 'username firstName lastName email avatar'
    })
    .exec(function(err, tournament) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(tournament);
      }
    });
});

router.post('/', function(req, res, next) {
  if (req.auth && req.auth.username) {
    User.findOne({username: req.auth.username}, {}, function(err, userRes) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      } else {
        var invitations = req.body.participants.slice(0, req.body.participants.length);
        req.body.owner = userRes._id;
        req.body.participants.push({user: userRes._id, state: 'ingame'});
        var tournament = new Tournament(
          req.body);
        tournament.save(function(err, saveRes) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          } else {
            invitations.forEach(function(invitation) {
              User.notify({
                message: 'Zostałeś zaproszony do turnieju',
                type: 'invitation',
                notifiedBy: userRes._id,
                tournament: saveRes._id
              }, invitation.user, function(err) {
                if (err) {
                  console.log('send invitations');
                  console.log(err);
                }
              });
            });
            return res.sendStatus(201);
          }
        });
      }
    });
  } else {
    return res.sendStatus(401);
  }
});

module.exports = router;