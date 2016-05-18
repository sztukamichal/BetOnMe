'use strict';

var bet = angular.module('bet', [])

  .controller('AddBetController', require('./add-bet-controller.js'))
  .controller('ChooseMatchController', require('./choose-match-controller.js'))
  
  .config(/*@ngInject*/ function ($stateProvider) {
    $stateProvider
      .state('add-bet', {
        url: '/add/bet',
        templateUrl: 'bet/add-bet.html',
        controller: 'AddBetController'
      })
      .state('add-bet.chooseMatch', {
        url: '/chooseMatch',
        templateUrl: 'bet/choose-match.html',
        controller: 'ChooseMatchController'
      })
    ;
  });

module.exports = bet;