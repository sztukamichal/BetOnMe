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
          goalsAwayTeam: Number,
          halfTime: {
            goalsHomeTeam: Number,
            goalsAwayTeam: Number
          },
          extraTime: {
            goalsHomeTeam: Number,
            goalsAwayTeam: Number
          },
          penaltyShootout: {
            goalsHomeTeam: Number,
            goalsAwayTeam: Number
          }
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
  this.find({"league": "EC"}, {"teams.teams._links.self.href": 1, "_id": 0}, callback);
};

SoccerSeasonSchema.statics.findAllSeasonsWithoutFixtures = function (callback) {
  this.find({}, {"fixtures": 0}, callback);
};

SoccerSeasonSchema.statics.getFixturesByDate = function (timeFrame, callback) {
  var from = new Date(),
    to = new Date(),
    prefix = timeFrame.slice(0,1),
    timeFrame = timeFrame.slice(1,timeFrame.length),
    days = parseInt(timeFrame);
  from.setHours(from.getHours() + 2);
  to.setHours(to.getHours() + 2);
  days = prefix === 'n' ? days : -days;
  to.setDate(to.getDate() + days);
  if(from > to) {
    var tmp = from;
    from = to;
    to = tmp;
  }
  from = from.toISOString();
  to = to.toISOString();
    this.aggregate([
      {$unwind: "$fixtures.fixtures"},
      {
        $match: {
          'fixtures.fixtures.date': {$gte: new Date(from), $lte: new Date(to)}
        }
      },
      {
        $group: {
          _id: {id: "$id", caption: "$caption"},
          fixtures: {$push: "$fixtures.fixtures"}
        }
      }
    ]).exec(callback);
};


var SoccerSeason = db.model('SoccerSeason', SoccerSeasonSchema);

module.exports = SoccerSeason;