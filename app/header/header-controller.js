'use strict';

module.exports = /*@ngInject*/ function($scope, $rootScope, $mdSidenav, UserService, LeagueService, $mdMenu) {

  function init() {
    $scope.isUserLogged = UserService.isUserLogged();
    if($scope.isUserLogged) {
      $scope.currentUser = UserService.getCurrentUser();
      $scope.name = $scope.currentUser.firstName;
      if(!$scope.seasons) {
        LeagueService.getSeasons()
          .success(function(res) {
            $scope.seasons = res;
          });
      }
    } else {
      $scope.name = 'Guest';
    }
  }
  init();

  $scope.hideMenu = function() {
    $mdMenu.hide();
  };

  $scope.logout = function() {
    $scope.isUserLogged = false;
    $scope.name = 'Guest';
    UserService.logout();
  };

  $scope.toggleSidenav = function(id) {
    $mdSidenav(id).toggle();
  };

  $rootScope.$on('login-success', function(event, data) {
    init();
  });

  $rootScope.$on('user-update', function(event, user) {
    $scope.currentUser = user;
    $scope.name = $scope.currentUser.firstName;
  });

  document.getElementById("hideAll").style.display = "block";
  window.onload = function() {
    document.getElementById("hideAll").style.display = "none";
  };

};