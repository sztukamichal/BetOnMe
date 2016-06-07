'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http, UserService) {

    var Settings = require('../../settings');
    var config, externalConfig;

    function init() {
      externalConfig = {headers: {"X-Auth-Token": Settings.footballApiToken}};
      config = {headers: {"X-Auth": UserService.getToken()}};
    }

    if(UserService.isUserLogged()) {
      init();
    }

    this.getBetTypes = function () {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getBetTypes, config);
    };

    return {
      getBetTypes: this.getBetTypes
    };
  };
};