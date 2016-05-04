'use strict';

var login = angular.module('login', [])

  .controller('LoginController', require('./login-controller.js'))

  .config(/*@ngInject*/ function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'LoginController'
      });
  });

module.exports = login;