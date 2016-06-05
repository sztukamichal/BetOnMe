'use strict';

module.exports = function() {

  this.$get = /*@ngInject*/  function($q, $http, $rootScope, UserService) {

    var Settings = require('../../settings');
    var externalConfig;
    var config;

    function init() {
      externalConfig = {headers: {"X-Auth-Token": Settings.footballApiToken}};
      config = {headers: {"X-Auth": UserService.getToken()}};
    }

    if(UserService.isUserLogged()) {
      init();
    }

    $rootScope.$on('login-success', init);

    this.getTeam = function (selfLink) {
      var conf = config;
        conf.headers['x-selflink'] = selfLink;
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getTeam, conf);
    };


    return {
      getTeam: this.getTeam
    };
  };
};