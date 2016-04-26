'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./home/index');
require('angular-material');

angular.module('betOnMe', [
  require('angular-ui-router'),
  'ngMaterial',
  'home'
]);
