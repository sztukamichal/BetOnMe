'use strict';

module.exports = /*@ngInject*/ function($scope, $mdSidenav) {

  $scope.name = "Michal";
  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };

};