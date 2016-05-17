'use strict';

module.exports = /*@ngInject*/ function($stateParams, $scope, LeagueService) {

  $scope.leagueId = $stateParams.leagueId;
  $scope.fixtures = undefined;
  $scope.leagueTable = undefined;

  LeagueService.getLeagueInfo($scope.leagueId)
    .success(function(res) {
      $scope.league = res;
    });

  LeagueService.getLeagueTeams($scope.leagueId)
    .success(function (res) {
      $scope.teams = res.teams;
    });

  $scope.loadFixtures = function () {
    if($scope.fixtures === undefined) {
      LeagueService.getLeagueFixtures($scope.leagueId)
        .success(function (res) {
          $scope.fixtures = res.fixtures;
        });
    }
  };

  $scope.loadLeagueTable = function () {
    if($scope.leagueTable === undefined) {
      LeagueService.getLeagueTable($scope.leagueId)
        .success(function (res) {
          $scope.leagueTable = res.standing;
          console.log($scope.leagueTable);
        });
    }
  };

  $scope.getCrestUrl = function (name) {
    var team = $scope.teams.find(function (element) {
      return element.name === name;
    });

    return team.crestUrl;
  };

};