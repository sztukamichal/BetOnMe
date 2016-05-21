'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($q, $http) {

    var Settings = require('../settings');
    var config = {headers:{"X-Auth-Token":Settings.footballApiToken}};
    var seasonsDeferred = $q.defer();

    this.getSeasons = function() {
      return seasonsDeferred.promise;
    };

    $http.get(Settings.footballQueries.soccerSeasons, config).then(function (res) {
      seasonsDeferred.resolve(res.data);
    });

    this.getLeagueInfo = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id, config);
    };

    this.getLeagueTeams = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/teams', config);
    };

    this.getLeagueFixtures = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/fixtures', config);
    };

    this.getLeagueTable = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/leagueTable', config);
    };
    
    this.getMatches = function (period, timeFrame, league) {
      if(timeFrame === undefined && league === undefined) {
        return $http.get(Settings.footballQueries.fixtures, config);
      } else if(timeFrame !== undefined && league === undefined) {
        return $http.get(Settings.footballQueries.fixtures + '?timeFrame=' + period + timeFrame, config);
      } else if(timeFrame !== undefined && league !== undefined) {
        return $http.get(Settings.footballQueries.fixtures + '?timeFrame=' + period  + timeFrame + '&league=' + league, config);
      } else if(timeFrame === undefined && league !== undefined) {
        return $http.get(Settings.footballQueries.fixtures + '?league=' + league, config);
      }
    };

    
    return {
      getLeagueInfo: this.getLeagueInfo,
      getLeagueTeams: this.getLeagueTeams,
      getLeagueFixtures: this.getLeagueFixtures,
      getLeagueTable: this.getLeagueTable,
      getSeasons: this.getSeasons,
      getMatches: this.getMatches
    };
  };
};