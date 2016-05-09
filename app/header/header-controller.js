'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, $state, $mdSidenav, UserService) {

  var originatorEv;
  $scope.isUserLogged = UserService.isUserLogged();
  $scope.name = "Guest";
  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $rootScope.$on('login-success', function(event, data) {
    $scope.isUserLogged = UserService.isUserLogged();
    if ($scope.isUserLogged) {
      $scope.name = UserService.getUsername();
    }
  });

  $scope.logout = function() {
    UserService.logout();
    $rootScope.$emit('logout');
    $scope.isUserLogged = UserService.isUserLogged();
    $scope.name = "Guest";
    $state.go('login');
  };

};