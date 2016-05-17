'use strict';

module.exports = /*@ngInject*/
  function () {
    return function (crestUrl) {
      var default_icon = '/assets/icons/planet-earth-' + Math.floor((Math.random() * 4) + 1) + '.svg';
      if (crestUrl === undefined || crestUrl === null || crestUrl === '') {
        return default_icon;
      }
      return crestUrl;
    };
  };
