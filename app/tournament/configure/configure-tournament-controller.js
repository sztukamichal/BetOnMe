'use strict';

module.exports = /*@ngInject*/ function($scope, $state, TournamentService) {

  $scope.template='custom';

  $scope.descriptions = {
    custom: 'Select this type of tournament if you want decide by yourself which matches will be bet on.',
    euro2016: 'Select this type of tournament if you want to bet on Euro 2016 matches.'
  };

  $scope.settings = {
    private: false,
    invitePrivilege: true,
    majorityToKick: true,
    addMatchPrivilege: 'vote',
    countPointsMethod: 'best',
    maxBetsPerMatch: 1
  };

  $scope.continue = function() {
    var tournament = {
      name: $scope.name,
      description : $scope.description,
      settings: getSettings()
    };
    $state.go('add-tournament.chooseMatch', {test:true,tournament: tournament});
  };

  function getSettings() {
    var settings = $scope.settings;
    var tmp = angular.toJson($scope.betTypes);
    tmp = JSON.parse(tmp);
    settings.betTypesConfiguration = tmp.filter(function(betType) {
      betType.possibleValues.forEach(function(value) {
        if(value.hasOwnProperty('typeWinner')){
          if(value.typeWinner.hasOwnProperty('enabled') && value.typeWinner.enabled === true) {
            delete value.typeWinner.enabled;
          } else {
            delete value.typeWinner;
          }
        }
      });
      var isEnabled = betType.enabled === true;
      if(isEnabled) {
        delete betType.enabled;
      }
      return isEnabled;
    });
    return settings;
  }

  TournamentService.getBetTypes().then(function(result) {
    $scope.betTypes = result.data;
  });

};