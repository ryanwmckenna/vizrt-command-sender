'use strict';

angular.module('commandsender.commands').config(['$stateProvider', function($stateProvider) {

	$stateProvider
		.state('commands', {
			url: '/commands',
			templateUrl: 'views/commands/commands.html',
			controller: 'Commands'
		});
}]);
