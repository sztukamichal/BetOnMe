'use strict';

module.exports = /*@ngInject*/ function ($scope, $mdDialog, chosenLeagues, LeagueService) {

  $scope.chosenLeagues = chosenLeagues;
  LeagueService.getSeasons().then(function (data) {
    $scope.leagues = data;
  });

  $scope.toggle = function (league) {
    var idx = $scope.chosenLeagues.indexOf(league);
    if (idx > -1) {
      $scope.chosenLeagues.splice(idx, 1);
    }
    else {
      $scope.chosenLeagues.push(league);
    }
  };
  $scope.exists = function (league) {
    return $scope.chosenLeagues.indexOf(league) > -1;
  };

  $scope.isIndeterminate = function() {
    return ($scope.chosenLeagues.length !== 0 && $scope.chosenLeagues.length !== $scope.leagues.length);
  };
  $scope.isChecked = function() {
    return $scope.chosenLeagues.length === $scope.leagues.length;
  };
  $scope.toggleAll = function() {
    if ($scope.chosenLeagues.length === $scope.leagues.length) {
      $scope.chosenLeagues = [];
    } else if ($scope.chosenLeagues.length === 0 || $scope.chosenLeagues.length > 0) {
      $scope.chosenLeagues = $scope.leagues.slice(0);
    }
  };

  $scope.close = function () {
    $mdDialog.hide($scope.chosenLeagues);
  };

};