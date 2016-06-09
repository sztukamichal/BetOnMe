'use strict';

var db = require('../db');

var TournamentSchema = db.Schema({
  name: String,
  description: String,
  settings: {
    addMatchPrivilege: String,
    privateTournament: Boolean,
    invitePrivilege: Boolean,
    majorityToKick: Boolean,
    countPointsMethod: String,
    maxBetsPerMatch: Number,
    betTypesConfiguration: [
      {
        _id: String,
        name: String,
        code: String,
        description: String,
        onlyKnockoutStage: Boolean,
        possibleValues: [
          {
            name: String,
            code: String,
            possiblePoints: Number,
            exactScore: {
              goalsHomeTeam: Number,
              goalsAwayTeam: Number
            },
            typeWinner: {
              homeTeamWins: Boolean,
              extraPoints: Number
            }
          }
        ]
      }
    ]
  },
  stages: [
    {
      stageTemplateId: String,
      stageName: String,
      extraPoints: Number,
      knockoutPhase: Boolean,
      fixtures: [{
        fixtureId: String,
        bets: [
          {
            betId: String
          }
        ]
      }]
    }
  ],
  participants: [
    {
      username: String,
      isAdmin: Boolean,
      pointsInTournament: Number
    }
  ]
});

var Tournament = db.model('Tournament', TournamentSchema);

module.exports = Tournament;