'use strict';

angular.module('commandsender', [
	'ui.bootstrap',
	'ui.router',
	'btford.socket-io',
	'commandsender.common',
	'commandsender.commands'
]);

angular.module('commandsender').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
			.otherwise('/');
	}
]);
