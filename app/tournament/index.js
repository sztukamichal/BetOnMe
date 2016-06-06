'use strict';

var bet = angular.module('bet', [])

  .controller('AddBetController', require('./add-bet-controller.js'))
  .controller('ChooseMatchController', require('./choose-match-controller.js'))
  
  .config(/*@ngInject*/ function ($stateProvider) {
    $stateProvider
      .state('add-tournament', {
        url: '/add/tournament',
        templateUrl: './tournament/add-bet.html',
        abstract: true,
        controller: 'AddBetController'
      })
      .state('add-tournament.chooseMatch', {
        url: '/chooseMatch',
        templateUrl: './tournament/choose-match.html',
        controller: 'ChooseMatchController'
      })
    ;
  });

module.exports = bet;