'use strict';

module.exports =
  angular.module('filters', [])
    .filter('crestUrlChange', require('./crest-url-change.js'));
