'use strict';

module.exports = /*@ngInject*/
  function($rootScope, $state, UserService) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!UserService.isUserLogged() && toState.name!== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    });

  };

