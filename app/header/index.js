'use strict';

var header = angular.module('header', [])

.controller('HeaderController', require('./header-controller.js'));

module.exports = header;