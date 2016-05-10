'use strict';

module.exports = function() {

  this.getUsersUrl = '../assets/fake/users.json';
  this.loginUrl = '../assets/fake/login.json';

  this.$get = /*@ngInject*/  function($q, $http, $resource, $timeout, localStorageService) {

    var User = {};
    var token = undefined;
    var those = this;

    var UsersResource = $resource('', {}, {
      getUsers: {
        url: this.getUsersUrl,
        method: 'GET'
      },
      login: {
        url: this.loginUrl,
        method: 'GET'
      }
    });

    this.getUser = function() {
      return $http.get('http://localhost:3000/api/users', {
        headers: {'X-Auth':token}
      });
    };

    this.login = function(username, password) {
      return $http.post('http://localhost:3000/api/sessions', {
        username: username, password: password
      }).then(function(res) {
        token = res.data;
        saveTokenToCookie(token);
        User = those.getUser();
        return User;
      }, function(res) {
        console.log(res);
      });
    };

    function saveTokenToCookie(token) {
      return localStorageService.cookie.set('token', token);
    }

    function loadTokenFromCookie() {
      var token = localStorageService.cookie.get('token');
      token = token === null ? undefined : token;
      return token;
    }

    function checkIfLogged() {
      token = loadTokenFromCookie();
    }

    checkIfLogged();

    this.logout = function() {
      localStorageService.cookie.remove('token');
      User = {};
    };

    this.getUsers = function() {
      return UsersResource.getUsers().$promise;
    };

    this.isUserLogged = function() {
      return token !== undefined;
    };

    return {
      login: this.login,
      logout: this.logout,
      getUsers: this.getUsers,
      isUserLogged: this.isUserLogged,
      getUsername: this.getUsername
    };
  };
};