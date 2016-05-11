'use strict';

module.exports = /*@ngInject*/ function ($scope, $rootScope, $timeout, UserService) {

  $scope.registerMode = false;
  $scope.errorMessage = '';
  $scope.newUser = {};

  $scope.login = function () {
    if ($scope.registerMode === true) {
      $scope.errorMessage = '';
      $scope.registerMode = false;
    } else if ($scope.loginForm.password.$error === {} && $scope.loginForm.username.$error === {} ) {
      UserService.login($scope.username, $scope.password);
    } else {
      showErrorMessage('Fill in your credentials');
    }
  };

  $scope.signUp = function () {
    if ($scope.registerMode === false) {
      $scope.errorMessage = '';
      $scope.registerMode = true;
    } else if($scope.registerForm.username === {} && $scope.registerForm.password === {} && $scope.registerForm.firstName === {} && $scope.registerForm.email === {}) {
      UserService.createUser($scope.newUser);
    } else {
      showErrorMessage('Fill in every required fields');
    }
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