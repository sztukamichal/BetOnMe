'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http, $state, $rootScope, localStorageService) {

    var Settings = require('../settings');
    var token;
    var those = this;
    var User;

    function saveTokenToCookie(token) {
      return localStorageService.cookie.set('token', token);
    }

    this.createUser = function(user) {
      $http.post(Settings.apiBaseUrl + Settings.apiQueries.createUser, user)
        .then(function() {
          those.login(user.username, user.password);
        },
        function(res) {
          if(res.status === 409) {
            $rootScope.$emit('username-exist-error', res);
          } else {
            console.log('Error during creating new user');
            console.log(res);
          }
        });
    };
    
    this.updateUser = function (user) {
      return $http.post(Settings.apiBaseUrl + Settings.apiQueries.updateUser, user);
    };
    
    this.getToken = function() {
      token = localStorageService.cookie.get('token');
      token = token === null ? undefined : token;
      return token;
    };

    this.getCurrentUser = function() {
      return User;
    };

    this.getCurrentUserFromServer = function () {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getCurrentUser, {headers: {'X-Auth':token}});
    };

    this.login = function (username, password) {
      $http.post(Settings.apiBaseUrl + Settings.apiQueries.getSession, {username: username, password: password})
        .then(function (res) {
          token = res.data;
          saveTokenToCookie(token);
          $http.defaults.headers.common['X-Auth'] = token;
          those.getCurrentUserFromServer()
            .then(function(res) {
              User = res.data;
              $rootScope.$emit('login-success', token);
              $state.go('home');
            });
        }, function (res) {
          $rootScope.$emit('login-failed', res);
        });
    };

    this.logout = function () {
      localStorageService.cookie.remove('token');
      token = undefined;
      $http.defaults.headers.common['X-Auth'] = token;
      $http.defaults.headers.common['X-Auth-Token'] = Settings.footballApiToken;
      $rootScope.$emit('logout');
      $state.go('login');
    };

    this.isUSerLogged = function () {
      return token !== undefined;
    };

    function init(){
      token = those.getToken();
      if(token !== undefined) {
        $http.defaults.headers.common['X-Auth'] = token;
        those.getCurrentUserFromServer()
          .then(function(res) {
            User = res.data;
          });
      }
    }

    init();

    return {
      login: this.login,
      logout: this.logout,
      getCurrentUser: this.getCurrentUser,
      getToken: this.getToken,
      isUserLogged: this.isUSerLogged,
      createUser: this.createUser,
      updateUser: this.updateUser
    };
  };
};