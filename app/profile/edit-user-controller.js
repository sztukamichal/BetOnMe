'use strict';

module.exports = /*@ngInject*/ function ($scope, $mdDialog, user, UserService) {
  $scope.currentUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    email: user.email
  };

  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function () {
    slides.push({
      id: currIndex++
    });
  };

  for (var i = 0; i < 50; i++) {
    $scope.addSlide();
  }

  $scope.validateUpdateForm = function() {
    return !($scope.updateForm.firstName.$error.hasOwnProperty(('required')) || $scope.updateForm.email.$error.hasOwnProperty('required') || $scope.updateForm.email.$error.hasOwnProperty('email'));
  };

  $scope.update = function () {
    UserService.updateUser($scope.currentUser)
      .success(function (res) {
        $mdDialog.hide($scope.currentUser);
      })
      .error(function (res) {
        console.log('error update', res);
      });
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
}
;