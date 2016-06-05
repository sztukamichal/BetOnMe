'use strict';

module.exports = function ($q, $scope, TeamService) {
  $scope.welcome = $scope.fixture;
  $scope.loaded = false;
  function init() {
    $q.all([TeamService.getTeam($scope.fixture._links.homeTeam.href),
    TeamService.getTeam($scope.fixture._links.awayTeam.href)]).then(function (results) {
      $scope.homeTeam = results[0].data[0];
      $scope.awayTeam = results[1].data[0];
      $scope.loaded = true;
    });
  }
  init();
};