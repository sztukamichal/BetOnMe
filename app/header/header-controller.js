'use strict';

module.exports = /*@ngInject*/ function($scope, $rootScope, $mdSidenav, UserService) {

  var originatorEv;

  function init() {
    $scope.isUserLogged = UserService.isUserLogged();
    if($scope.isUserLogged) {
      $scope.currentUser = UserService.getCurrentUser();
      $scope.name = $scope.currentUser.firstName;
    } else {
      $scope.name = 'Guest';
    }
  }
  init();

  $scope.logout = function() {
    $scope.isUserLogged = false;
    $scope.name = 'Guest';
    UserService.logout();
  };

  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };

  $rootScope.$on('login-success', function(event, data) {
    init();
  });

  document.getElementById("hideAll").style.display = "block";
  window.onload = function() {
    document.getElementById("hideAll").style.display = "none";
  };

};