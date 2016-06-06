'use strict';

var db = require('../db');

var TournamentSchema = db.Schema({
  name: String,
  description: String,
  settings: {
    private: Boolean,
    invitePrivilege: Boolean,
    majorityToKick: Boolean,
    addMatchPrivilege: String,
    typeOfBets: [
      {
        typeName: String,
        possiblePoints: Number
      }
    ]
  },
  stages: [
    {
      id: String,
      name: String,
      extraPoints: Number,
      fixtures: [
        {
          fixtureId: String,
          possiblePoints: [
            {
              typeName: String,
              possiblePoints: Number
            }
          ],
          bets: [
            {
              username: String,
              types: [{
                typeName: String,
                prediction: String
              }],
              date: Date
            }
          ]
        }
      ]
    }
  ],
  participants: [
    {
      username: String,
      pointsInTournament: Number
    }
  ]
});

var Tournament = db.model('Tournament', TournamentSchema);

module.exports = Tournament;