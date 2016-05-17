'use strict';

module.exports = /*@ngInject*/
  function() {
    return function(items) {
      return items.slice().reverse();
    };
  };
