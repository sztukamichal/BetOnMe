'use strict';

var db = require('../db');

var SoccerSeasonSchema = db.Schema({
  id: Number,
  caption: String,
  league: String,
  year: String,
  currentMatchdays: Number,
  numberOfMatchdays: Number,
  numberOfTeams: Number,
  numberOfGames: Number,
  lastUpdated: Date,
  _links: {
    self: {
      href: String
    },
    teams: {
      href: String
    },
    fixtures: {
      href: String
    },
    leagueTable: {
      href: String
    }
  },
  teams: {
    _links: {
      self: {
        href: String
      },
      soccerseason: {
        href: String
      }
    },
    count: Number,
    teams: [
      {
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
        crestUrl: String
      }
    ]
  },
  fixtures: {
    _links: {
      self: {
        href: String
      },
      soccerseason: {
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
  leagueTable: {
    _links: {
      self: {
        href: String
      },
      soccerseason: {
        href: String
      }
    },
    leagueCaption: String,
    matchday: Number,
    standing: [
      {
        _links: {
          team: {
            href: String
          }
        },
        position: Number,
        teamName: String,
        crestURI: String,
        playedGames: Number,
        points: Number,
        goals: Number,
        goalsAgainst: Number,
        goalDifference: Number,
        wins: Number,
        draws: Number,
        losses: Number,
        home: {
          goals: Number,
          goalsAgainst: Number,
          wins: Number,
          draws: Number,
          losses: Number
        },
        away: {
          goals: Number,
          goalsAgainst: Number,
          wins: Number,
          draws: Number,
          losses: Number
        }
      }
    ]
  }
});

SoccerSeasonSchema.statics.findAllTeams = function (callback) {
  this.find({"league": "EC"}, {"teams.teams._links.self.href":1, "_id":0}, callback);
};

SoccerSeasonSchema.statics.findAllSeasonsWithoutFixtures = function (callback) {
  this.find({}, {"fixtures":0}, callback);
};

var SoccerSeason = db.model('SoccerSeason', SoccerSeasonSchema);

module.exports = SoccerSeason;