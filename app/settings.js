'use strict';

module.exports = {

  apiBaseUrl: 'http://localhost:3000/api/',
  apiQueries: {
    getSession: 'sessions',
    getCurrentUser: 'users',
    createUser: 'users',
    updateUser: 'users/update/'
  },
  footballQueries: {
    soccerSeasons: 'http://api.football-data.org/v1/soccerseasons/',
    fixtures: 'http://api.football-data.org/v1/fixtures',
    teams: 'http://api.football-data.org/v1/teams/'
  },
  footballApiToken: '9a8811776d5c434f8c4b2abc439f97c6'

};