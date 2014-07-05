'use strict';

angular.module('hoopdateApp')
  .filter('age', function (moment) {
    return function (input) {
	    var age = moment().diff(moment(input), 'years');
	    return age;
    };
  });
