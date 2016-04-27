'use strict';

var home = angular.module('home', [])

  .controller('HomeController', require('./home-controller.js'))

  .config(/*@ngInject*/ function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeController'
      });
  });

module.exports = home;