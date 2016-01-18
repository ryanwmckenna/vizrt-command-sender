'use strict';

angular.module('commandsender.commands').config(['$stateProvider', function($stateProvider) {

	$stateProvider
		.state('commands', {
			url: '/',
			templateUrl: 'views/commands/commands.html',
			controller: 'Commands'
		});
}]);
