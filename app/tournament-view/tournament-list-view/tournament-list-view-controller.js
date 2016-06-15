'use strict';

module.exports = function($scope, TournamentService) {

  function init() {
    TournamentService.getAllTournaments().then(function(res) {
      console.log(res);
      $scope.tournaments = res;
      $scope.selected = 0;
    });
    $scope.showList = true;
  }

  init();

  $scope.selectTournament = function(index) {
    $scope.selected = index;
  };

};