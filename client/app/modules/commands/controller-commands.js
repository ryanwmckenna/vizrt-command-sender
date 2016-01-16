'use strict';

angular.module('commandsender.commands')
    .controller('Commands', ['$scope',
        function($scope) {

            var vm = {

              property: 'RENDERER',

              stack: [],
              newCommand: []

            };

            $scope.vm = vm;

        }
    ]);
