'use strict';

module.exports = function ($q, $scope, TeamService) {
  $scope.welcome = $scope.fixture;
  $scope.loaded = false;
  $scope.selected = $scope.selected === undefined ? false : $scope.selected;
  $scope.toggleSelected = function() {
    $scope.selected = !$scope.selected;
  };
  function init() {
    $q.all([TeamService.getTeam($scope.fixture.match._links.homeTeam.href),
    TeamService.getTeam($scope.fixture.match._links.awayTeam.href)]).then(function (results) {
      $scope.homeTeam = results[0].data[0];
      $scope.awayTeam = results[1].data[0];
      $scope.loaded = true;
    });
  }
  init();
};