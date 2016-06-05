'use strict';


module.exports = function ($scope, $mdDialog, LeagueService) {
  $scope.chosenLeagues = [];
  $scope.days = 7;
  $scope.inputTeamName = '';
  function createPrefixes(chosenLeagues) {
    $scope.leaguePrefixes = '';
    chosenLeagues.forEach(function (league, index) {
      if(index === 0) {
        $scope.leaguePrefixes = league.league;
      } else {
        $scope.leaguePrefixes += ',' + league.league;
      }
    });
  }
  LeagueService.getSeasons().then(function (data) {
    $scope.leagues = data;
    $scope.chosenLeagues = angular.copy(data);
    createPrefixes($scope.chosenLeagues);
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
        createPrefixes($scope.chosenLeagues);
      }, function() {
        console.log('cancel');
      });
  };
  $scope.findMatches = function() {
    LeagueService.getFixtures('n', $scope.days, $scope.leaguePrefixes).then(function (res) {
      console.log(res);
      $scope.fixtures = res.data;
      $scope.filterFixtures();
    });
  };
  $scope.filterFixtures = function () {
    if($scope.fixtures !== undefined) {
      $scope.filteredFixtures = $scope.fixtures.filter(function (fixture) {
        var name = fixture.match.homeTeamName + ' ' + fixture.match.awayTeamName;
        var index = name.toLowerCase().search($scope.inputTeamName.toLowerCase());
        return index > -1;
      });
    }
  };
};