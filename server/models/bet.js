'use strict';

var db = require('../db');

var BetSchema = db.Schema({
  fixtureId: String,
  userId: String,
  betTypeId: String,
  prediction: {
    code: String,
    gainedPoints: Number,
    possiblePoints: Number,
    exactScore: {
      goalsHomeTeam: Number,
      goalsAwayTeam: Number
    },
    typeWinner: {
      homeTeamWins: Boolean,
      gainedPoints: Number,
      possiblePoints: Number
    }
  },
  gainedPoints: Number,
  possiblePoints: Number,
  creationDate: Date,
  updateDate: Date
});

var Bet = db.model('Bet', BetSchema);

module.exports = Bet;