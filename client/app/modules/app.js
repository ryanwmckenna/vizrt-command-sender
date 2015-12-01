'use strict';

angular.module('commandsender', [
	'ui.router',
	'commandsender.commands'
]);

angular.module('commandsender').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
			.otherwise('/');
	}
]);