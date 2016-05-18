'use strict';


module.exports = function ($scope, $mdDialog, LeagueService) {
  $scope.chosenLeagues = [];
  $scope.days = 7;
  LeagueService.getSeasons().then(function (data) {
    $scope.leagues = data;
  });
  $scope.chooseLeague = function (league) {
    $scope.chosenLeague = league;
  };
  $scope.showChooseLeaguesDialog = function ($event) {
    $mdDialog.show({
        parent: angular.element(document.querySelector('#mainBody')),
        targetEvent: $event,
        templateUrl: './bet/choose-leagues.html',
        locals: {
          chosenLeagues: $scope.chosenLeagues
        },
        controller: require('./choose-leagues-controller.js')
      })
      .then(function(chosenLeagues) {
        $scope.chosenLeagues = chosenLeagues;
      }, function() {
        console.log('cancel');
      });
  };
  LeagueService.getMatches().then(function (res) {
    $scope.fixtures = res.data.fixtures;
  });
};