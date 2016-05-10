'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, UserService) {
  
  function init(){
    $scope.isUserLogged = UserService.isUserLogged();
  }
  init();

  $rootScope.$on('login-success', function() {
    $scope.isUserLogged = true;
  });

  $rootScope.$on('logout', function() {
    $scope.isUserLogged = false;
  });

};