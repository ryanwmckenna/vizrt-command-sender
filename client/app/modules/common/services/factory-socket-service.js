'use strict';

angular.module('commandsender.common')
	.factory('socketService', ['socketFactory', '$q', function(socketFactory, $q) {

		var socket = io('localhost:7000', {transports: ['websocket', 'polling-xhr', 'polling']});

		var socketService = socketFactory({ioSocket: socket});

		socketService.once('getid', function(id){
			//console.log(id);
			socketService.clientId = id;
		});

		socketService.send = function(name, options){

			var deferred = $q.defer();

			socketService.emit(name, options, function(data){
				//console.log(data);
				deferred.resolve(data);
			});

			return deferred.promise;
		};

		socketService.connect();

		return socketService;
	}]);

/*angular.module('commandsender')
	.run(['socketService', function(socketService) {
		return socketService;
	}]);*/
