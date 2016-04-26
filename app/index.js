'use strict';

var angular = require('angular');


var betOnMeApp = angular.module('betOnMeApp', []);

betOnMeApp.controller('testCtrl', function($scope) {
  $scope.welcome = "Hello world!";
});