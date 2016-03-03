'use strict';

angular.module('commandsender.common')
	.factory('R', ['$window', function($window) {
		return $window.R;
	}]);