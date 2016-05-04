'use strict';

module.exports = /*@ngInject*/ function($scope, $mdSidenav, UserService) {

  var originatorEv;
  $scope.isUserLogged = UserService.isUserLogged();
  $scope.name = "Michal";
  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

};