'use strict';

angular.module('commandsender.commands')
    .controller('Commands', ['$scope',
        function($scope) {

            var vm = {
              
              stack: [],
              newCommand: []

            };

            $scope.vm = vm;

        }
    ]);
