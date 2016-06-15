'use strict';

var tournamentViewModule = angular.module('tournament-view', [])
  .controller('TournamentListViewController', require('./tournament-list-view/tournament-list-view-controller'))

  .config(function($stateProvider) {
    $stateProvider
      .state('tournament-view', {
        url: '/tournaments',
        templateUrl: './tournament-view/tournament-view.html',
        abstract: true
      })
      .state('tournament-list-view', {
        url: '/tournaments',
        templateUrl: './tournament-view/tournament-list-view/tournament-list-view.html',
        controller: 'TournamentListViewController'
      });
  });

module.exports = tournamentViewModule;