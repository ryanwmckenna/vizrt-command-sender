'use strict';

angular.module('commandsender.commands')
  .directive('vizrtCommandBuilder', function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          commands: '='
        },
        templateUrl: 'views/commands/templates/template-command-builder.html',
        link: function(scope) {

          scope.properties = [
                '#OBJECTID',
                'ALL_TABLE',
                'ANIMATION*KEY*$',
                'ARCHIVE',
                'AUDIO',
                'AUDIO_CLIP',
                'AUTOKEYWORD',
                'BACK_SCENE',
                'BASE_FONT',
                'BGL_COMPATIBILITY',
                'BUILT_IN',
                'CHAR_STYLE',
                'CLOCK',
                'CLOCK%1',
                'CLOCK*DATA',
                'CLR',
                'CMD_RECORD',
                'COMMANDS_XML',
                'CONFIGURATION',
                'CONSOLE',
                'CONTAINER',
                'DATABASE',
                'DEBUG_CONTROL',
                'DEBUG_PUSH',
                'DEVICE',
                'DIRECTORY',
                'EDITOR',
                'EVS',
                'FEEDBACK',
                'FEEDBACKUNICAST',
                'FONT',
                'FRONT_SCENE',
                'FUNCTION',
                'GEOM',
                'GLOBAL',
                'GUI*PID',
                'RENDERER'             
              ];
        }
      };
    });
