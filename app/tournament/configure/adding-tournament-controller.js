'use strict';

module.exports = /*@ngInject*/ function($scope, UserService) {
  $scope.welcome = 'Dodawanie';
  $scope.contacts = [];

  $scope.filterSelected = true;

  $scope.querySearch = function(criteria) {
    return $scope.allUsers.filter(createFilterFor(criteria));
  };

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(contact) {
      return (contact._lowername.indexOf(lowercaseQuery) !== -1);
    };

  }

  var loadUsers = function() {
    UserService.getUsers().then(
      function(data) {
        var allUsers = data.users.map(function (user, index) {
          var contact = {
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            image: '../assets/icons/user.jpg'
          };
          contact._lowername = contact.name.toLowerCase();
          return contact;
        });
        $scope.allUsers = allUsers;
      },
      function(data) {
        console.log(data);
      }
    );
  };
  loadUsers();

};