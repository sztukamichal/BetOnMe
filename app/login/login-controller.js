'use strict';

module.exports = /*@ngInject*/ function($scope, UserService, $state) {

  $scope.name = "Michal";

  $scope.login = function() {
    UserService.login($scope.username, $scope.password);
    $state.go('home');
  };

};