'use strict';

var db = require('../db');

var TeamSchema = db.Schema({
  _links: {
    self: {
      href: String
    },
    fixtures: {
      href: String
    },
    players: {
      href: String
    }
  },
  name: String,
  code: String,
  shortName: String,
  squadMarketValue: String,
  crestUrl: String,
  fixtures: {
    _links: {
      self: {
        href: String
      },
      team: {
        href: String
      }
    },
    count: Number,
    fixtures: [
      {
        _links: {
          self: {
            href: String
          },
          soccerseason: {
            href: String
          },
          homeTeam: {
            href: String
          },
          awayTeam: {
            href: String
          }
        },
        date: Date,
        status: String,
        matchday: Number,
        homeTeamName: String,
        awayTeamName: String,
        result: {
          goalsHomeTeam: Number,
          goalsAwayTeam: Number
        }
      }
    ]
  },
  players: {
    _links: {
      self: {
        href: String
      },
      team: {
        href: String
      }
    },
    count: Number,
    players: [
      {
        name: String,
        position: String,
        jerseyNumber: Number,
        dateOfBirth: Date,
        nationality: String,
        contractUntil: Date,
        marketValue: String
      }
    ]
  }
});

var Team = db.model('Team', TeamSchema);

module.exports = Team;