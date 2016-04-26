'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('./home/index');


angular.module('betOnMe', [
  require('angular-ui-router'),
  'home'
]);
