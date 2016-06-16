'use strict';

module.exports = function($scope, TournamentService) {

  function init() {
    $scope.tournaments = [];
    TournamentService.getAllTournaments().then(function(res) {
      $scope.tournaments = res;
      $scope.selectedTournament = $scope.tournaments.length > 0 ? $scope.tournaments[0] : {};
    });
    $scope.showList = true;
    $scope.search = {
      name: ''
    };
    $scope.alwaysTrue = true;
  }

  init();

  $scope.toggleShowList = function() {
    $scope.showList = !$scope.showList;
  };

  $scope.selectTournament = function(id) {
    $scope.selectedTournament = $scope.tournaments.find(function(tournament) {
      return tournament._id === id;
    });
  };

};