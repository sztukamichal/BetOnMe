'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($q, $http, UserService) {

    var Settings = require('../settings');
    var externalConfig = {headers: {"X-Auth-Token": Settings.footballApiToken}};
    var config = {headers: {"X-Auth": UserService.getToken()}};
    var seasonsDeferred = $q.defer();
    var those = this;

    function findSeason(id) {
      var seasons = [];
      var result = $q.defer();
      those.getSeasons().then(function (data) {
        seasons = data;
        result.resolve(seasons.find(function (season) {
          return season.id == id;
        }));
      });
      return result.promise;
    }

    this.getSeasons = function () {
      return seasonsDeferred.promise;
    };

    $http.get(Settings.apiBaseUrl + Settings.apiQueries.getSeasonsWithoutFixtures, config).then(function (res) {
      var seasons = res.data;
      seasonsDeferred.resolve(seasons);
    });

    this.getLeague = function (id) {
      return findSeason(id);
    };

    this.getLeagueTeams = function (id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + '/' + id + '/teams', externalConfig);
    };

    this.getLeagueFixtures = function (id) {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getSeasonFixtures + '/' + id , config);
    };

    this.getLeagueTable = function (id) {
      var leagueTable = $q.defer();
      findSeason(id).then(function (season) {
        if(season !== undefined) {
          leagueTable.resolve(season.leagueTable);
        } else {
          console.log('league not found');
        }
      });
      return leagueTable.promise;
    };

    this.getMatches = function (period, timeFrame, league) {
      if (timeFrame === undefined && league === undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures, externalConfig);
      } else if (timeFrame !== undefined && league === undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?timeFrame=' + period + timeFrame, externalConfig);
      } else if (timeFrame !== undefined && league !== undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?timeFrame=' + period + timeFrame + '&league=' + league, externalConfig);
      } else if (timeFrame === undefined && league !== undefined) {
        return $http.get(Settings.externalFootballQueries.fixtures + '?league=' + league, externalConfig);
      }
    };


    return {
      getLeague: this.getLeague,
      getLeagueTeams: this.getLeagueTeams,
      getLeagueFixtures: this.getLeagueFixtures,
      getLeagueTable: this.getLeagueTable,
      getSeasons: this.getSeasons,
      getMatches: this.getMatches
    };
  };
};