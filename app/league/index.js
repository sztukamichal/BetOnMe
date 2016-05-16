'use strict';

var home = angular.module('league', [])

  .controller('LeagueController', require('./league-controller.js'))

  .config(/*@ngInject*/ function($stateProvider) {
    $stateProvider
      .state('league', {
        url: '/league/:leagueId',
        templateUrl: 'league/league.html',
        controller: 'LeagueController'
      });
  });

module.exports = home;