'use strict';

module.exports = function() {

  this.getUsersUrl = '../assets/fake/users.json';
  this.loginUrl = '../assets/fake/login.json';

  this.$get = /*@ngInject*/  function($q, $resource, $timeout, localStorageService) {

    var User = {};

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

    this.getUsername = function() {
      return User.username;
    };

    this.login = function(username, password) {
      var deffered = $q.defer();
      if (username === 'michal' && password === 'sztuka') {
        UsersResource.login().$promise.then(
          function(data) {
            User = data;
            saveUserToCookie(User.username);
            deffered.$$resolve(data);
          },
          function(error) {
            deffered.$$reject(error);
          }
        );
        return deffered.promise;
      } else {

        $timeout(function() {
          deffered.$$reject('wrong credentials');
          console.log('wrong credentials');
        }, 1000);

        return deffered.promise;
      }
    };

    function saveUserToCookie(username){
      return localStorageService.cookie.set('username', username);
    }

    function loadUserFromCookie() {
      return localStorageService.cookie.get('username');
    }

    function checkIfLogged() {
      User.username = loadUserFromCookie();
    }

    checkIfLogged();

    this.logout = function() {
      localStorageService.cookie.remove('username');
      User.username = undefined;
    };

    this.getUsers = function() {
      return UsersResource.getUsers().$promise;
    };

    this.isUserLogged = function() {
      return User.username !== undefined;
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