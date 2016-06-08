'use strict';

var directives = angular.module('directives', [])

  .directive('myEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.myEnter);
          });

          event.preventDefault();
        }
      });
    };
  })
  .directive('myMatch', function () {
    return {
      restrict: 'E',
      scope: {
        fixture: '=fixture',
        type: '=type',
        selected: '=selected'
      },
      templateUrl: './common/directives/my-match-directive/my-match-template.html',
      controller: require('./my-match-directive/my-match-controller.js')
    };
  })
  ;

module.exports = directives;