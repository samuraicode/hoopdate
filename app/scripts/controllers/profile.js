'use strict';

angular.module('hoopdateApp')
  .controller('ProfileCtrl', function ($scope, $http) {
    $http.get('/api/profile/me').success(function(profile) {
      $scope.profile = profile;
    });
  });
