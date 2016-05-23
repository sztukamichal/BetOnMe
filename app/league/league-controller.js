'use strict';

module.exports = /*@ngInject*/ function($stateParams, $scope, LeagueService) {

  $scope.leagueId = $stateParams.leagueId;
  $scope.fixtures = undefined;
  $scope.leagueTable = undefined;

  LeagueService.getLeague($scope.leagueId)
    .then(function(res) {
      $scope.league = res;
    });

  $scope.loadFixtures = function () {
    if($scope.fixtures === undefined) {
      LeagueService.getLeagueFixtures($scope.leagueId)
        .then(function (res) {
          $scope.fixtures = res.data[0].fixtures.fixtures;
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