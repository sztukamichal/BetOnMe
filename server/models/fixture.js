'use strict';

var db = require('../db');

var FixtureSchema = db.Schema({
  fixture: {
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
  },
  head2head: {
    count: Number,
    timeFrameStart: Date,
    timeFrameEnd: Date,
    homeTeamWins: Number,
    awayTeamWins: Number,
    draws: Number,
    lastHomeWinHomeTeam: {
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
    },
    lastWinHomeTeam: {
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
      status: Date,
      matchday: Number,
      homeTeamName: String,
      awayTeamName: String,
      result: {
        goalsHomeTeam: Number,
        goalsAwayTeam: Number
      }
    },
    lastAwayWinAwayTeam: {
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
      status: Date,
      matchday: Number,
      homeTeamName: String,
      awayTeamName: String,
      result: {
        goalsHomeTeam: Number,
        goalsAwayTeam: Number
      }
    },
    lastWinAwayTeam: {
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
    },
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
  }
});

var Fixture = db.model('Fixture', FixtureSchema);

module.exports = Fixture;