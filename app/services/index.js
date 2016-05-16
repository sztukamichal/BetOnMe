'use strict';

var services = angular.module('services', [])

  .provider('UserService', require('./user-service.js'))
  .provider('LeagueService', require('./league-service.js'));

module.exports = services;