'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http) {

    var Settings = require('../settings');

    this.getLeagueInfo = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id, {headers:{"X-Auth-Token":Settings.footballApiToken}});
    };

    this.getLeagueTeams = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/teams', {headers:{"X-Auth-Token":Settings.footballApiToken}});
    };

    this.getLeagueFixtures = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/fixtures', {headers:{"X-Auth-Token":Settings.footballApiToken}});
    };

    this.getLeagueTable = function (id) {
      return $http.get(Settings.footballQueries.soccerSeasons + id +'/leagueTable', {headers:{"X-Auth-Token":Settings.footballApiToken}});
    };

    this.getSeasons = function() {
      return $http.get(Settings.footballQueries.soccerSeasons, {headers:{"X-Auth-Token":Settings.footballApiToken}});
    };

    
    return {
      getLeagueInfo: this.getLeagueInfo,
      getLeagueTeams: this.getLeagueTeams,
      getLeagueFixtures: this.getLeagueFixtures,
      getLeagueTable: this.getLeagueTable,
      getSeasons: this.getSeasons
    };
  };
};