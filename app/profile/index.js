'use strict';

var profile = angular.module('profile', [])

  .controller('ProfileController', require('./profile-controller.js'))
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('light-green').backgroundPalette('light-green').dark();
    $mdThemingProvider.theme('lime').backgroundPalette('lime').dark();
    $mdThemingProvider.theme('amber').backgroundPalette('amber').dark();
    $mdThemingProvider.theme('yellow').backgroundPalette('yellow').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });


module.exports = profile;