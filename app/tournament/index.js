'use strict';

var bet = angular.module('bet', [])

  .controller('AddBetController', require('./add-bet-controller.js'))
  .controller('ChooseMatchController', require('./choose-matches/choose-match-controller.js'))
  
  .config(/*@ngInject*/ function ($stateProvider) {
    $stateProvider
      .state('add-tournament', {
        url: '/add/tournament',
        templateUrl: './tournament/add-bet.html',
        abstract: true,
        controller: 'AddBetController'
      })
      .state('add-tournament.configure', {
        url: '/configure',
        templateUrl: './tournament/configure-tournament.html',
        controller: 'ConfigureTournamentController'
      })
      .state('add-tournament.chooseMatch', {
        url: '/chooseMatch',
        templateUrl: './tournament/choose-matches/choose-match.html',
        controller: 'ChooseMatchController'
      })
    ;
  });

module.exports = bet;