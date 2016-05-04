'use strict';

module.exports = function() {

  this.getUsersUrl = '../assets/fake/users.json';

  this.$get = /*@ngInject*/  function($resource) {

    var User = {};

    var UsersResource = $resource('', {}, {
      getUsers: {
        url: this.getUsersUrl,
        method: 'GET'
      }
    });

    this.getUsername = function() {
      return User.username;
    };

    this.login = function(username, password) {
      User.username = username;
    };

    this.getUsers = function() {
      return UsersResource.getUsers().$promise;
    };

    this.isUserLogged = function() {
      return User.username !== undefined;
    };

    return {
      login: this.login,
      getUsers: this.getUsers,
      isUserLogged: this.isUserLogged,
      getUsername: this.getUsername
    };
  };
};