'use strict';

module.exports = /*@ngInject*/ function ($rootScope, $scope, UserService, $mdDialog) {

  function init() {
    $scope.isUserLogged = UserService.isUserLogged();
    if ($scope.isUserLogged) {
      $scope.currentUser = UserService.getCurrentUser();
    }
  }

  init();

  $scope.showEditUserDialog = function ($event) {
    $mdDialog.show({
      parent: angular.element(document.querySelector('#mainBody')),
      targetEvent: $event,
      templateUrl: './profile/edit-user-info.html',
      locals: {
        user: $scope.currentUser
      },
      controller: require('./edit-user-controller.js')
    })
      .then(function(user) {
        $scope.currentUser = user;
        $rootScope.$emit('user-update', user);
      });
  };

  $rootScope.$on('login-success', function () {
    $scope.isUserLogged = true;
    $scope.currentUser = UserService.getCurrentUser();
  });

  $rootScope.$on('logout', function () {
    $scope.isUserLogged = false;
  });

};