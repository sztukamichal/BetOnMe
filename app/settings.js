'use strict';

module.exports = {

  apiBaseUrl: 'http://localhost:3000/api/',
  apiQueries: {
    getSession: 'sessions',
    getCurrentUser: 'users',
    createUser: 'users'
  },
  footballQueries: {
    getLeagueInfo: 'http://api.football-data.org/v1/soccerseasons/'
  },
  footballApiToken: '9a8811776d5c434f8c4b2abc439f97c6'

};