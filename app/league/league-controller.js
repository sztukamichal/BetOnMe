'use strict';

module.exports = /*@ngInject*/ function($stateParams, $scope, $http) {

  $scope.leagueId = $stateParams.leagueId;

  $http.get('http://api.football-data.org/v1/soccerseasons/424')
    .success(function(res) {
      $scope.league = res;
    });

};