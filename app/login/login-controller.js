'use strict';

module.exports = /*@ngInject*/ function($scope, $rootScope, $timeout, UserService) {

  $scope.registerMode = false;
  $scope.errorMessage = '';
  $scope.newUser = {};

  function validateLogin() {
    return !$scope.loginForm.password.$error.hasOwnProperty('required') && !$scope.loginForm.username.$error.hasOwnProperty('required');
  }

  $scope.login = function() {
    if ($scope.registerMode === true) {
      $scope.errorMessage = '';
      $scope.registerMode = false;
    } else if (validateLogin()) {
      UserService.login($scope.username, $scope.password);
    } else {
      showErrorMessage('Fill in your credentials');
    }
  };

  function validateRegisterForm() {
    return !($scope.registerForm.username.$error.hasOwnProperty('required') || $scope.registerForm.username.$error.hasOwnProperty('minlength') ||
            $scope.registerForm.password.$error.hasOwnProperty('required') || $scope.registerForm.password.$error.hasOwnProperty('minlength') ||
            $scope.registerForm.confirmPassword.$error.hasOwnProperty('required') || $scope.registerForm.confirmPassword.$error.hasOwnProperty('pattern') ||
            $scope.registerForm.firstName.$error.hasOwnProperty(('required')) || $scope.registerForm.email.$error.hasOwnProperty('required') ||  $scope.registerForm.email.$error.hasOwnProperty('email'));
  }

  $scope.signUp = function() {
    if ($scope.registerMode === false) {
      $scope.errorMessage = '';
      $scope.registerMode = true;
    } else if (validateRegisterForm()) {
      UserService.createUser($scope.newUser);
    } else {
      showErrorMessage('Fill in every required fields');
    }
  };

  function showErrorMessage(text) {
    $scope.errorMessage = text;
    $timeout(function() {
      $scope.errorMessage = '';
    }, 4000);
  }

  $rootScope.$on('login-failed', function() {
    showErrorMessage('Wrong credentials');
  });
};