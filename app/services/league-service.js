'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http) {

    var Settings = require('../settings');
    $http.defaults.headers.common['X-Auth-Token'] = Settings.footballApiToken;

    this.getLeagueInfo = function (id) {
      return $http.get(Settings.footballQueries.getLeagueInfo + id);
    };

    this.getLeagueTeams = function (id) {
      return $http.get(Settings.footballQueries.getLeagueInfo + id +'/teams');
    };

    this.getLeagueFixtures = function (id) {
      return $http.get(Settings.footballQueries.getLeagueInfo + id +'/fixtures');
    };

    this.getLeagueTable = function (id) {
      return $http.get(Settings.footballQueries.getLeagueTable + id +'/leagueTable');
    };
    
    return {
      getLeagueInfo: this.getLeagueInfo,
      getLeagueTeams: this.getLeagueTeams,
      getLeagueFixtures: this.getLeagueFixtures,
      getLeagueTable: this.getLeagueTable
    };
  };
};