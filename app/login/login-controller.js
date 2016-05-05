'use strict';

module.exports = /*@ngInject*/ function($rootScope, $scope, UserService, $state) {

  $scope.name = "Michal";

  $scope.login = function() {
    UserService.login($scope.username, $scope.password).then(
      function(data) {
        console.log(data);
        $rootScope.$emit('login-success', data);
        $state.go('home');
      }
    );
  };

};