'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, UserService) {
  
  function init(){
    $scope.isUserLogged = UserService.isUserLogged();
    if($scope.isUserLogged) {
      $scope.currentUser = UserService.getCurrentUser();
    }
  }
  init();

  $rootScope.$on('login-success', function() {
    $scope.isUserLogged = true;
    $scope.currentUser = UserService.getCurrentUser();
  });

  $rootScope.$on('logout', function() {
    $scope.isUserLogged = false;
  });

};