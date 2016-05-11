'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http, $state, $rootScope, localStorageService) {

    var Settings = require('../settings');
    var token;

    function saveTokenToCookie(token) {
      return localStorageService.cookie.set('token', token);
    }

    this.getToken = function() {
      token = localStorageService.cookie.get('token');
      token = token === null ? undefined : token;
      return token;
    };

    this.getToken();

    this.getCurrentUser = function () {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getCurrentUser, {headers: {'X-Auth':token}})
        .then(function (data) {
          console.log(data);
        });
    };

    this.login = function (username, password) {
      $http.post(Settings.apiBaseUrl + Settings.apiQueries.getSession, {username: username, password: password})
        .then(function (res) {
          token = res.data;
          saveTokenToCookie(token);
          $rootScope.$emit('login-success', token);
          $http.defaults.headers.common['X-Auth'] = token;
          $state.go('home');
        }, function (res) {
          $rootScope.$emit('login-failed', res);
        });
    };

    this.logout = function () {
      localStorageService.cookie.remove('token');
      token = undefined;
      $rootScope.$emit('logout');
      $state.go('login');
    };

    this.isUSerLogged = function () {
      this.getToken();
      return token !== undefined;
    };

    return {
      login: this.login,
      logout: this.logout,
      getCurrentUser: this.getCurrentUser,
      getToken: this.getToken,
      isUserLogged: this.isUSerLogged
    };
  };
};