'use strict';

angular.module('home', [])

  .config(/*@ngInject*/ function($stateProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html'
      });
  });