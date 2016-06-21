'use strict';

module.exports = /*@ngInject*/ function ($rootScope, $scope, UserService, $mdDialog, TournamentService) {

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
      controller: require('./edit-user-controller.js'),
      hasBackdrop: false
    })
      .then(function(user) {
        $scope.currentUser = user;
        $rootScope.$emit('user-update', user);
      });
  };

  $scope.confirmNotification = function(notification) {
    if(notification.type === 'invitation') {
      TournamentService.acceptTournamentInvitation(notification.tournament._id).then(function(response) {
        console.log(response);
      });
    }
  };

  $rootScope.$on('login-success', function () {
    $scope.isUserLogged = true;
    $scope.currentUser = UserService.getCurrentUser();
  });

  $rootScope.$on('logout', function () {
    $scope.isUserLogged = false;
  });

};