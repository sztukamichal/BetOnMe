'use strict';

var profile = angular.module('profile', [])

  .controller('ProfileController', require('./profile-controller.js'))
  .provider('UserService', require('./user-service.js'));

module.exports = profile;