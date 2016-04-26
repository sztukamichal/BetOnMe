'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-animate');
require('angular-aria');

angular.module('betOnMe', [
  'ui.router',
  require('./home').name
]);
