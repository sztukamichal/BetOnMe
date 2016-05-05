'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, UserService) {
  $scope.username = 'Michal Sztuka';
  $scope.isUserLogged = UserService.isUserLogged();


  $rootScope.$on('login-success', function(event, data) {
    console.log(data);
    $scope.isUserLogged = UserService.isUserLogged();
  });

  $rootScope.$on('logout', function(event, data) {
    $scope.isUserLogged = UserService.isUserLogged();
  });

};