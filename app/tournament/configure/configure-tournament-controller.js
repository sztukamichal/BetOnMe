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

  $scope.template='custom';

  $scope.descriptions = {
    custom: 'Select this type of tournament if you want decide by yourself which matches will be bet on.',
    euro2016: 'Select this type of tournament if you want to bet on Euro 2016 matches.'
  };

  $scope.settings = {
    private: false,
    invitePrivilege: true,
    majorityToKick: true,
    addMatchPrivilege: 'vote'
  };

};