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

  var customTemplate = {
    stages:[
      {
        stageTemplateId: 'custom',
        stageName: 'Example',
        extraPoints: 1,
        knockoutPhase: false,
        fixtures: []
      }
    ]
  };

  var euro2016template = {
    stages: [
      {
        stageTemplateId: 'euro2016groupStage',
        stageName: 'Euro 2016 - Group stage',
        extraPoints: 1,
        knockoutPhase: false,
        fixtures: [
          {
            fixtureId: 23,
            bets: []
          }
        ]
      },
      {
        stageTemplateId: 'euro2016roundOf16',
        stageName: 'Euro 2016 - 1/8 final',
        extraPoints: 2,
        knockoutPhase: true,
        fixtures: [
          {
            fixtureId: 23,
            bets: []
          }
        ]
      },
      {
        stageTemplateId: 'euro2016quarters',
        stageName: 'Euro 2016 - Quarter final',
        extraPoints: 3,
        knockoutPhase: true,
        fixtures: [
          {
            fixtureId: 23,
            bets: []
          }
        ]
      },
      {
        stageTemplateId: 'euro2016semis',
        stageName: 'Euro 2016 - Semi final',
        extraPoints: 4,
        knockoutPhase: true,
        fixtures: [
          {
            fixtureId: 23,
            bets: []
          }
        ]
      },
      {
        stageTemplateId: 'euro2016final',
        stageName: 'Euro 2016 - Final',
        extraPoints: 5,
        knockoutPhase: true,
        fixtures: [
          {
            fixtureId: 23,
            bets: []
          }
        ]
      }
    ]
  };

  var templates = {
    euro2016: euro2016template,
    custom: customTemplate
  };

  $scope.changeTemplate = function() {
    $scope.tournamentTemplate = templates[$scope.template];
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