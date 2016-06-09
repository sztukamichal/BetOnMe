'use strict';

module.exports = /*@ngInject*/ function($scope, $state, $mdDialog, TournamentService, $q, $timeout, UserService) {

  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;

  function setTournamentTemplates() {
    TournamentService.getTournamentTemplates().then(function (result) {
      $scope.tournamentTemplates = result.data;
      $scope.chosenTemplateIdx = 0;
      $scope.chosenTemplate = {};
      angular.copy($scope.tournamentTemplates[$scope.chosenTemplateIdx], $scope.chosenTemplate);
    });
  }

  function getSettings() {
    var settings = $scope.chosenTemplate.settings;
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

  function getParticipants() {
    var participants = $scope.chosenUsers.map(function(contact) {
      return {
        username: contact.username,
        pointsInTournament: 0
      };
    });

    participants.push({
      username: $scope.currentUser.username,
      isAdmin: true,
      pointsInTournament: 0
    });

    return participants;
  }

  function getTournamentObject() {
    return {
      name: $scope.name,
      description: $scope.description,
      settings: getSettings(),
      participants: getParticipants(),
      stages: $scope.chosenTemplate.stages
    };
  }

  function setBetTypes() {
    TournamentService.getBetTypes().then(function (result) {
      $scope.betTypes = result.data;
    });
  }
  
  function loadUsers() {
    UserService.getAllUsers().then(function(result) {
      $scope.allUsers = result.data;
      $scope.allUsers.forEach(function(contact) {
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

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(contact) {
      return (contact._lowname.indexOf(lowercaseQuery) !== -1);
    };
  }

  function refreshDebounce() {
    lastSearch = 0;
    pendingSearch = null;
    cancelSearch = angular.noop;
  }

  function debounceSearch() {
    var now = new Date().getMilliseconds();
    lastSearch = lastSearch || now;
    return ((now - lastSearch) < 300);
  }

  function querySearch (criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? $scope.allUsers.filter(createFilterFor(cachedQuery)) : [];
  }

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
        }, 120, true);
      });
    }
    return pendingSearch;
  }

  function init() {
    $scope.currentUser = UserService.getCurrentUser();
    $scope.allUsers = [];
    $scope.chosenUsers = [];
    $scope.querySearch = querySearch;
    $scope.delayedQuerySearch = delayedQuerySearch;
    setTournamentTemplates();
    setBetTypes();
    loadUsers();
  }

  init();

  $scope.continue = function() {
    console.log(getTournamentObject())
    /*TournamentService.createTournament(getTournamentObject()).then(function(res) {
      console.log(res);
    });*/
    //$state.go('add-tournament.chooseMatch', {test:true,tournament: tournament});
  };

  $scope.showEditStageDialog = function ($event, index) {
    $mdDialog.show({
      parent: angular.element(document.querySelector('#mainBody')),
      targetEvent: $event,
      templateUrl: './tournament/configure/configure-stage.html',
      locals: {
        stage: $scope.chosenTemplate.stages[index]
      },
      controller: 'ConfigureStageController',
      hasBackdrop: false
    })
      .then(function(stage) {
        $scope.chosenTemplate.stages[index] = stage;
      });
  };

  $scope.changeTournamentTemplate = function() {
    $scope.chosenTemplate = {};
    angular.copy($scope.tournamentTemplates[$scope.chosenTemplateIdx], $scope.chosenTemplate);
  };

  $scope.removeStage = function (index) {
    $scope.chosenTemplate.stages.splice(index,1);
  };

  $scope.addNewStage = function () {
    $scope.chosenTemplate.stages.push(
      {
        stageName: 'Example name # ' + $scope.chosenTemplate.stages.length,
        extraPoints: $scope.chosenTemplate.stages.length,
        knockoutPhase: false,
        fixtures: []
      });
  };

};