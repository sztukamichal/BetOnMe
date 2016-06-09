'use strict';

module.exports = function () {

  this.$get = /*@ngInject*/  function ($http, $state, $rootScope, localStorageService) {

    var Settings = require('../../settings');
    var token;
    var those = this;
    var User;

    function saveTokenToCookie(token) {
      return localStorageService.cookie.set('token', token);
    }

    this.createUser = function(user) {
      $http.post(Settings.apiBaseUrl + Settings.apiQueries.createUser, user, {headers: {'X-Auth':token}})
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
      return $http.post(Settings.apiBaseUrl + Settings.apiQueries.updateUser, user, {headers: {'X-Auth':token}});
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

    this.getAllUsers = function () {
      return $http.get(Settings.apiBaseUrl + Settings.apiQueries.getAllUsers, {headers: {'X-Auth':token}});
    };

    this.login = function (username, password) {
      $http.post(Settings.apiBaseUrl + Settings.apiQueries.getSession, {username: username, password: password}, {headers: {'X-Auth':token}})
        .then(function (res) {
          token = res.data;
          saveTokenToCookie(token);
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
      $rootScope.$emit('logout');
      $state.go('login');
    };

    this.isUserLogged = function () {
      return token !== undefined;
    };

    function init(){
      token = those.getToken();
      if(token !== undefined) {
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
      getAllUsers: this.getAllUsers,
      getToken: this.getToken,
      isUserLogged: this.isUserLogged,
      createUser: this.createUser,
      updateUser: this.updateUser
    };
  };
};