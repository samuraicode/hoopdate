'use strict';

angular.module('hoopdateApp')
  .controller('ProfileCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/profile/' + $routeParams.profileId).success(function(profile) {
      $scope.profile = profile;
    });
  });
