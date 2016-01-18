'use strict';

angular.module('commandsender.commands')
  .directive('vizrtCommandBuilder', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        command: '='
      },
      templateUrl: 'views/commands/template-command-builder.html',
      link: function(scope) {

        
      }
    };
  });
