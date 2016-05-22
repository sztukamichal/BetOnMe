'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($q, $http) {

    var Settings = require('../settings');
    var config = {headers: {"X-Auth-Token": Settings.footballApiToken}};
    var seasonsDeferred = $q.defer();

    this.getSeasons = function () {
      return seasonsDeferred.promise;
    };

    $http.get(Settings.externalFootballQueries.soccerSeasons + '?season=2015', config).then(function (res) {
      var seasons2015 = res.data;
      $http.get(Settings.externalFootballQueries.soccerSeasons + '?season=2016', config).then(function (res) {
        seasonsDeferred.resolve(seasons2015.concat(res.data));
      });
    });

    this.getLeagueInfo = function (id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + '/' + id, config);
    };

    this.getLeagueTeams = function (id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + '/' + id + '/teams', config);
    };

    this.getLeagueFixtures = function (id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + '/' + id + '/fixtures', config);
    };

    this.getLeagueTable = function (id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + '/' + id + '/leagueTable', config);
    };

    this.getMatches = function (period, timeFrame, league) {
      if (timeFrame === undefined && league === undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures, config);
      } else if (timeFrame !== undefined && league === undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?timeFrame=' + period + timeFrame, config);
      } else if (timeFrame !== undefined && league !== undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?timeFrame=' + period + timeFrame + '&league=' + league, config);
      } else if (timeFrame === undefined && league !== undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?league=' + league, config);
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