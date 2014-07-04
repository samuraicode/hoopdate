'use strict';

angular.module('hoopdateApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/profile').success(function(profiles) {
      $scope.profiles = profiles;
    });
  });
