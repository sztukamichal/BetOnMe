'use strict';

module.exports = /*@ngInject*/ function($scope, $state, $mdDialog, TournamentService, $q, $timeout, UserService, $mdToast) {

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

  function getParticipants() {
    var participants = $scope.asyncContacts.map(function(contact) {
      return {
        username: contact.username,
        pointsInTournament: 0
      };
    });

    participants.push({
      username: $scope.currentUser.username,
      isAdmin: true,
      pointsInTournament: 0
    })

    return participants;
  }

  $scope.currentUser = UserService.getCurrentUser();

  $scope.continue = function() {
    var tournament = {
      name: $scope.name,
      description : $scope.description,
      settings: getSettings(),
      participants: getParticipants(),
      stages: $scope.tournamentTemplate.stages
    };
    TournamentService.createTournament(tournament).then(function(res) {
      console.log(res);
    })
    //$state.go('add-tournament.chooseMatch', {test:true,tournament: tournament});
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
        ]
      },
      {
        stageTemplateId: 'euro2016roundOf16',
        stageName: 'Euro 2016 - 1/8 final',
        extraPoints: 2,
        knockoutPhase: true,
        fixtures: [
        ]
      },
      {
        stageTemplateId: 'euro2016quarters',
        stageName: 'Euro 2016 - Quarter final',
        extraPoints: 3,
        knockoutPhase: true,
        fixtures: [
        ]
      },
      {
        stageTemplateId: 'euro2016semis',
        stageName: 'Euro 2016 - Semi final',
        extraPoints: 4,
        knockoutPhase: true,
        fixtures: [
        ]
      },
      {
        stageTemplateId: 'euro2016final',
        stageName: 'Euro 2016 - Final',
        extraPoints: 5,
        knockoutPhase: true,
        fixtures: [
        ]
      }
    ]
  };

  var templates = {
    euro2016: euro2016template,
    custom: customTemplate
  };


  $scope.showEditStageDialog = function ($event, index) {
    $mdDialog.show({
      parent: angular.element(document.querySelector('#mainBody')),
      targetEvent: $event,
      templateUrl: './tournament/configure/configure-stage.html',
      locals: {
        stage: $scope.tournamentTemplate.stages[index]
      },
      controller: 'ConfigureStageController',
      hasBackdrop: false
    })
      .then(function(stage) {
        $scope.tournamentTemplate.stages[index] = stage;
      });
  };

  $scope.tournamentTemplate = {
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

  $scope.changeTemplate = function() {
    $scope.tournamentTemplate = {};
    angular.copy(templates[$scope.template], $scope.tournamentTemplate);
  };

  $scope.remove = function (index) {
    $scope.tournamentTemplate.stages.splice(index,1);
  };

  $scope.addNewStage = function () {
    $scope.tournamentTemplate.stages.push(
      {
        stageTemplateId: 'custom',
        stageName: 'Example' + $scope.tournamentTemplate.stages.length,
        extraPoints: $scope.tournamentTemplate.stages.length,
        knockoutPhase: false,
        fixtures: []
      });
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

  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;
  $scope.asyncContacts = [];
  $scope.filterSelected = true;
  $scope.querySearch = querySearch;
  $scope.delayedQuerySearch = delayedQuerySearch;
  $scope.allContacts = [];
  /**
   * Search for contacts; use a random delay to simulate a remote call
   */
  function querySearch (criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
  }
  /**
   * Async search for contacts
   * Also debounce the queries; since the md-contact-chips does not support this
   */
  function delayedQuerySearch(criteria) {
    cachedQuery = criteria;
    if ( !pendingSearch || !debounceSearch() )  {
      cancelSearch();
      return pendingSearch = $q(function(resolve, reject) {
        // Simulate async search... (after debouncing)
        cancelSearch = reject;
        $timeout(function() {
          resolve( $scope.querySearch() );
          refreshDebounce();
        }, Math.random() * 500, true);
      });
    }
    return pendingSearch;
  }
  function refreshDebounce() {
    lastSearch = 0;
    pendingSearch = null;
    cancelSearch = angular.noop;
  }
  /**
   * Debounce if querying faster than 300ms
   */
  function debounceSearch() {
    var now = new Date().getMilliseconds();
    lastSearch = lastSearch || now;
    return ((now - lastSearch) < 300);
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(contact) {
      return (contact._lowname.indexOf(lowercaseQuery) !== -1);
    };
  }
  function loadUsers() {
    UserService.getAllUsers().then(function(result) {
      $scope.allContacts = result.data;
      $scope.allContacts.forEach(function(contact) {
        if(contact.username !== $scope.currentUser.username) {
          contact.avatar = '../assets/avatars/people-'+contact.avatar + '.svg';
          contact.name = contact.firstName + ' ' + contact.lastName;
          contact._lowname = contact.name.toLowerCase();
        } else {
          contact._lowname = '';
        }
      });
    });
  }

  loadUsers();
};