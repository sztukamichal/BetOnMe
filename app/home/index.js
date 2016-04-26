'use strict';

var home = angular.module('home', [])

  .config(/*@ngInject*/ function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      });
  });