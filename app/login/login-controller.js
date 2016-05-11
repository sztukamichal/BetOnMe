'use strict';

module.exports = /*@ngInject*/ function ($scope, $rootScope, $timeout, UserService) {

  $scope.registerMode = false;
  $scope.errorMessage = '';

  $scope.login = function () {
    if ($scope.registerMode === true) {
      $scope.errorMessage = '';
      $scope.registerMode = false;
    } else if ($scope.username !== undefined && $scope.password !== undefined) {
      UserService.login($scope.username, $scope.password);
    } else {
      showErrorMessage('Fill in your credentials');
    }
  };

  $scope.signUp = function () {
    $scope.errorMessage = '';
    $scope.registerMode = true;
  };

  function showErrorMessage(text){
    $scope.errorMessage = text;
    $timeout(function() {
      $scope.errorMessage = '';
    },4000);
  }

  $rootScope.$on('login-failed', function () {
    showErrorMessage('Wrong credentials');
  });
};