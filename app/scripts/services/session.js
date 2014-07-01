'use strict';

angular.module('hoopdateApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
