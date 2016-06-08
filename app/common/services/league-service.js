'use strict';

module.exports = function() {

  this.$get = /*@ngInject*/  function($q, $http, $rootScope, UserService) {

    var Settings = require('../../settings');
    var seasonsDeferred = $q.defer();
    var externalConfig;
    var config;
    var those = this;

    function init() {
      externalConfig = {headers: {"X-Auth-Token": Settings.footballApiToken}};
      config = {headers: {"X-Auth": UserService.getToken()}};
      $http.get(Settings.apiBaseUrl + Settings.apiQueries.getSeasonsWithoutFixtures, config).then(function(res) {
        var seasons = res.data;
        seasonsDeferred.resolve(seasons);
      });
    }

    if(UserService.isUserLogged()) {
      init();
    }

    $rootScope.$on('login-success', init);

    function findSeason(id) {
      var seasons = [];
      var result = $q.defer();
      those.getSeasons().then(function(data) {
        seasons = data;
        result.resolve(seasons.find(function(season) {
          return season.id == id;
        }));
      });
      return result.promise;
    }

    this.getSeasons = function() {
      return seasonsDeferred.promise;
    };


    this.getLeague = function(id) {
      return findSeason(id);
    };

    this.getLeagueTeams = function(id) {
      return $http.get(Settings.externalFootballQueries.soccerSeasons + id + '/teams', externalConfig);
    };

    this.getFixtures = function(period, timeFrame, league) {
      if (timeFrame === undefined && league === undefined) {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getFixtures, config);
      } else if (timeFrame !== undefined && league === undefined) {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getFixtures + '?timeFrame=' + period + timeFrame, config);
      } else if (timeFrame !== undefined && league !== undefined) {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getFixtures + '?timeFrame=' + period + timeFrame + '&leagueCodes=' + league, config);
      } else if (timeFrame === undefined && league !== undefined) {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getFixtures + '?leagueCodes=' + league, config);
      }
    };

    this.getFixtureByLink = function(link) {
      var conf = config;
      conf.headers['x-selflink'] = link;
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getFixtureByLink , conf);
    };

    this.getLeagueFixtures = function(id, timeFrame) {
      if(timeFrame === undefined) {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getSeasonFixtures + id , config);
      } else {
        return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getSeasonFixtures + id + '?timeFrame=' + timeFrame, config);
      }
    };

    this.getLeagueTable = function(id) {
      var leagueTable = $q.defer();
      findSeason(id).then(function(season) {
        if (season !== undefined) {
          leagueTable.resolve(season.leagueTable);
        } else {
          console.log('league not found');
        }
      });
      return leagueTable.promise;
    };

    this.getMatches = function(period, timeFrame, league) {
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
      getMatches: this.getMatches,
      getFixtures: this.getFixtures,
      getFixtureByLink: this.getFixtureByLink
    };
  };
};