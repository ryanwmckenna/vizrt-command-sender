'use strict';

angular.module('commandsender.commands')
    .controller('Commands', ['$scope',
        function($scope) {

            var vm = {

              stack: [],
              newCommand: ['','','','','','']

            };

            vm.addToStack = function() {
            /* commandService.addCommand(vm.newCommand); */
            vm.stack.push(vm.newCommand);
            vm.newCommand = ['','','','','',''];
            };

            $scope.vm = vm;

        }
    ]);
