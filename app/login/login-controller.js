'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, UserService, $state) {

  $scope.registerMode = false;
  $scope.signup = function() {
    $scope.registerMode = true;
  };
  $scope.login = function() {
    if ($scope.registerMode === true) {
      $scope.registerMode = false;
    } else {
      UserService.login($scope.username, $scope.password).then(
        function(data) {
          console.log(data);
          $rootScope.$emit('login-success', data);
          $state.go('home');
        }
      );
    }
  };
};