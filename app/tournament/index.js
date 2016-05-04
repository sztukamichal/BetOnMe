'use strict';

var tournament = angular.module('tournament', [])
  .controller('AddingTournamentController', require('./adding-tournament-controller.js'))
  .config(/*@ngInject*/ function($stateProvider) {
    $stateProvider
      .state('tournament', {
        url: '/add/tournament',
        templateUrl: 'tournament/adding-tournament.html',
        controller: 'AddingTournamentController'
      });
  });

module.exports = tournament;