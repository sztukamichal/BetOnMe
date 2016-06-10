'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http, UserService, $q, $rootScope) {

    var Settings = require('../../settings');
    var config, externalConfig;
    var tournamentsDeferred = $q.defer();

    function getAllTournamentsFromServer() {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getAllTournaments, config);
    }

    function init() {
      externalConfig = {headers: {"X-Auth-Token": Settings.footballApiToken}};
      config = {headers: {"X-Auth": UserService.getToken()}};
      getAllTournamentsFromServer().then(function(res) {
        tournamentsDeferred.resolve(res.data);
      });
    }

    if(UserService.isUserLogged()) {
      init();
    }

    $rootScope.$on('login-success', init);

    this.getBetTypes = function () {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getBetTypes, config);
    };

    this.createTournament = function(tournament) {
     return $http.post(Settings.apiBaseUrl + Settings.apiQueries.createTournament, tournament, config);
    };

    this.getTournamentTemplates = function() {
      return $http.get('../assets/tournament-templates/tournament-templates.json', config);
    };

    this.getAllTournaments = function() {
      return tournamentsDeferred.promise;
    };

    return {
      getBetTypes: this.getBetTypes,
      createTournament: this.createTournament,
      getTournamentTemplates: this.getTournamentTemplates,
      getAllTournaments: this.getAllTournaments
    };
  };
};