'use strict';

var services = angular.module('services', [])

  .provider('UserService', require('./user-service.js'));

module.exports = services;