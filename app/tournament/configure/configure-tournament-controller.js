'use strict';

module.exports = /*@ngInject*/ function($scope, UserService) {

  $scope.exactScore = {
    enabled: false,
    points: 3
  };
  $scope.winner = {
    enabled: true,
    points: 2
  };

  $scope.settings = {
    private: false,
    invitePrivilege: true,
    majorityToKick: true,
    addMatchPrivilege: 'vote'
  };

};