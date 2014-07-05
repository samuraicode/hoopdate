'use strict';

angular.module('hoopdateApp')
	.controller('ProfileCtrl', function ($scope, $http, $routeParams) {
		$scope.activePhoto = null;
		$http.get('/api/profile/' + $routeParams.profileId).success(function(profile) {
			$scope.profile = profile;
			$scope.activePhoto = profile.photos[0];
		});
		$scope.setPhoto = function(photo) {
			$scope.activePhoto = photo;
		};
	});
