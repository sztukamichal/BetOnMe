'use strict';

module.exports = /*@ngInject*/ function ($scope, $rootScope, UserService) {

  $scope.registerMode = false;
  $scope.signup = function () {
    $scope.registerMode = true;
  };
  $scope.login = function () {
    if ($scope.registerMode === true) {
      $scope.registerMode = false;
    } else if ($scope.username !== undefined && $scope.password !== undefined) {
      UserService.login($scope.username, $scope.password);
    } else {
      $scope.errorText = 'Fill in your credentials';
    }
  };
  $rootScope.$on('login-failed', function () {
    $scope.errorText = 'Wrong credentials';
  });
};