'use strict';

module.exports = /*@ngInject*/ function ($scope, $mdDialog, stage, LeagueService) {

  var _ = require('lodash');

  function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; i+=1) {
      for(var j=i+1; j<a.length; j+=1) {
        if(a[i].match._links.self.href === a[j].match._links.self.href){
          a.splice(j, 1);
          j-=1;
        }
      }
    }

    return a;
  }
  $scope.loaded=false;

  $scope.stage = _.cloneDeep(stage);
  $scope.fixtures = [];
  if($scope.stage.fixtures.length === 0 ){
    $scope.loaded = true;
  }
  $scope.stage.fixtures.forEach(function(fixture, index) {
    LeagueService.getFixtureByLink(fixture.fixtureId).then(function(result) {
      result.data[0].selected = true;
      result.data[0].index = index;
      $scope.fixtures.push(result.data[0]);
      if(index === $scope.stage.fixtures.length -1 ){
        $scope.filterFixtures();
        $scope.stage.fixtures = [];
        $scope.loaded=true;
      }
    });
  });
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
      $scope.fixtures = arrayUnique($scope.fixtures.concat(res.data));
      $scope.fixtures.forEach(function(fixture, index) {
        fixture.selected = fixture.selected === true ;
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
        $mdDialog.hide($scope.stage);
      }
    });
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}
;