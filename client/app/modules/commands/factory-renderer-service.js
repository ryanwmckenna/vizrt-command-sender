'use strict';

angular.module('commandsender.commands')
	.factory('rendererService', ['socketService', function(socketService) {

		var render = function(options) {
			return socketService.send('render', {
				type: 'send-to-renderer',
				options: options
			});
		};

		return {
			render: render
		};
	}]);
