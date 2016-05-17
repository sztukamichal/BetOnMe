'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-material');
require('angular-messages');
require('angular-resource');
require('angular-local-storage');
require('angular-smart-table');

angular.module('betOnMe', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'ngResource',
  'ngAnimate',
  'LocalStorageModule',
  'smart-table',
  require('./home').name,
  require('./profile').name,
  require('./header').name,
  require('./tournament').name,
  require('./login').name,
  require('./league').name,
  require('./services').name,
  require('./directives').name,
  require('./filters').name
])
  .run(require('./run.js'))

  .controller('mainController', function($scope, $rootScope, UserService) {
    $scope.isUserLogged = UserService.isUserLogged();
    $rootScope.$on('login-success', function() {
      $scope.isUserLogged = true;
    });
    $rootScope.$on('logout', function() {
      $scope.isUserLogged = false;
    });
  })

  .config(/*@ngInject*/ function($urlRouterProvider) {
    $urlRouterProvider
      .when('', '/home')
      .otherwise('/home');
  })

  .config(/*@ngInject*/ function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('BetOnMe');
  })

  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('light-green').backgroundPalette('light-green').dark();
    $mdThemingProvider.theme('lime').backgroundPalette('lime').dark();
    $mdThemingProvider.theme('amber').backgroundPalette('amber').dark();
    $mdThemingProvider.theme('yellow').backgroundPalette('yellow').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('warn').accentPalette('orange').dark().primaryPalette('pink');
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });
