'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-material');

angular.module('betOnMe', [
  'ui.router',
  'ngMaterial',
  require('./home').name,
  require('./profile').name,
  require('./header').name
]);
