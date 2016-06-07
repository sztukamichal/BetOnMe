'use strict';

var db = require('../db');

var TypeOfBetSchema = db.Schema({
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
});

var TypeOfBet = db.model('TypeOfBet', TypeOfBetSchema);

module.exports = TypeOfBet;