'use strict';

module.exports = function($scope, TournamentService, $mdDialog, $rootScope, $timeout) {

  function init() {
    $scope.tournaments = [];
    TournamentService.getAllTournaments().then(function(res) {
      $scope.tournaments = res;
      $scope.selectedTournament = $scope.tournaments.length > 0 ? $scope.tournaments[0] : {};
      $scope.loaded = true;
    });
    $scope.showList = true;
    $scope.search = {
      name: ''
    };
    $scope.alwaysTrue = true;
  }

  $scope.loaded = false;
  init();

  $scope.refreshData = function($event) {
    $scope.loaded = false;
    $mdDialog.show({
      parent: angular.element(document.querySelector('#mainBody')),
      targetEvent: $event,
      templateUrl: './tournament-view/tournament-list-view/loading-template.html',
      controller: function($rootScope) {
        $rootScope.$on('loaded', function() {
          $mdDialog.hide();
        });
      },
      hasBackdrop: false
    });
    TournamentService.getAllTournamentsFromServer().then(function(res) {
      $scope.tournaments = res.data;
      $scope.selectedTournament = $scope.tournaments.length > 0 ? $scope.tournaments[0] : {};
      $timeout(function() {
        $rootScope.$broadcast('loaded');
        $scope.loaded = true;
      }, 1000);
    });
  };

  $scope.toggleShowList = function() {
    $scope.showList = !$scope.showList;
  };

  $scope.selectTournament = function(id) {
    $scope.selectedTournament = $scope.tournaments.find(function(tournament) {
      return tournament._id === id;
    });
  };

};