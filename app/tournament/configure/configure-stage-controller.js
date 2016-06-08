'use strict';

module.exports = /*@ngInject*/ function ($scope, $mdDialog, stage, LeagueService) {

  var _ = require('lodash');

  $scope.stage = _.cloneDeep(stage);
  $scope.chosenLeagues = [];
  $scope.days = 7;
  $scope.inputTeamName = '';
  $scope.createPrefixes = function() {
    $scope.leaguePrefixes = '';
    $scope.chosenLeagues.forEach(function (league, index) {
      if(index === 0) {
        $scope.leaguePrefixes = league.league;
      } else {
        $scope.leaguePrefixes += ',' + league.league;
      }
    });
  };
  $scope.show = function(es) {
    console.log(es)
  }
  LeagueService.getSeasons().then(function (data) {
    $scope.leagues = data;
    $scope.chosenLeagues = angular.copy(data);
    $scope.createPrefixes();
  });
  $scope.chooseLeague = function (league) {
    $scope.chosenLeague = league;
  };
  $scope.findMatches = function() {
    LeagueService.getFixtures('n', $scope.days, $scope.leaguePrefixes).then(function (res) {
      $scope.fixtures = res.data;
      $scope.fixtures.forEach(function(fixture, index) {
        fixture.selected = false;
        fixture.index = index;
      });
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

  $scope.toggleAllMatches = function() {
    $scope.filteredFixtures.forEach(function(fixture) {
      $scope.fixtures[fixture.index].selected = !$scope.fixtures[fixture.index].selected;
    });
  };

  LeagueService.getSeasons().then(function (data) {
    $scope.leagues = data;
  });

  $scope.toggle = function (league) {
    var idx = $scope.chosenLeagues.findIndex(function (element) {
      return element.id === league.id;
    });
    if (idx > -1) {
      $scope.chosenLeagues.splice(idx, 1);
    }
    else {
      $scope.chosenLeagues.push(league);
    }
    $scope.createPrefixes();
  };
  $scope.exists = function (league) {
    return $scope.chosenLeagues.findIndex(function (element) {
        return element.id === league.id;
      }) > -1;
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
    $scope.createPrefixes();
  };

  $scope.validateUpdateForm = function() {
    if($scope.updateForm !== undefined) {
      return !($scope.updateForm.name.$error.hasOwnProperty(('required')) || $scope.updateForm.extraPoints.$error.hasOwnProperty('required'));
    } else {
      return false;
    }
  };

  $scope.update = function () {
    var tmp;
    $scope.fixtures.forEach(function(fixture, index) {
      if(fixture.selected === true) {
        tmp = {
          bets: [],
          fixtureId: fixture.match._links.self.href
        };
        $scope.stage.fixtures.push(tmp);
      }
      if(index === $scope.fixtures.length - 1) {
        console.log($scope.stage)
        $mdDialog.hide($scope.stage);
      }
    });
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}
;