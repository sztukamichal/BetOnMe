'use strict';

module.exports = /*@ngInject*/ function($scope, UserService) {
  $scope.username = 'Michal Sztuka';
  $scope.isUserLogged = UserService.isUserLogged();
};