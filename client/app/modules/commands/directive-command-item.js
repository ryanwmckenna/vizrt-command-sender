'use strict';

angular.module('commandsender.commands')
  .directive('commandItem', ['R', function(R) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        command: '=',
        send: '&',
        copy: '&',
        edit: '&',
        remove: '&'
      },
      templateUrl: 'views/commands/template-command-item.html',
      link: function(scope) {

        scope.needsMultiline = function(text){
          return (text.length > 100) || R.test(/\r/, text) || R.test(/\n/, text);
        };

      }
    };
  }]);
