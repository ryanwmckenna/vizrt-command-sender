'use strict';

angular.module('commandsender.commands')
  .controller('Commands', ['$scope', 'rendererService', 'uuidService',
    function($scope, rendererService, uuidService) {

      var vm = {
        stack: [],
        newCommand: {
          commandId: uuidService.newUuid(),
          properties: ['', '', ''],
          command: '',
          attributes: ''
        },
        ip: '127.0.0.1',
        response: '',
        editingCommand: false
      };

      vm.resetCommand = function(){
        vm.newCommand = {
          commandId: uuidService.newUuid(),
          properties: ['', '', ''],
          command: '',
          attributes: ''
        };
      };

      vm.addToStack = function() {
        vm.stack.push(vm.newCommand);
        vm.resetCommand();
      };

      vm.editCommand = function(command) {
        vm.newCommand = angular.copy(command);
        vm.editingCommand = true;
      };

      vm.cancelEdit = function() {
        vm.editingCommand = false;
        vm.resetCommand();
      };

      vm.confirmEdit = function() {
        var temp = [];

        for (var i = 0; i < vm.stack.length; i+= 1){
          if(vm.newCommand.commandId === vm.stack[i].commandId){
            temp.push(vm.newCommand);
          } else {
            temp.push(vm.stack[i]);
          }
        }

        vm.stack = temp;

        vm.editingCommand = false;
        vm.resetCommand();
      };

      vm.deleteCommand = function(index) {
        var temp = [];

        for (var i = 0; i < vm.stack.length; i+= 1){
          if(i !== index){
            temp.push(vm.stack[i]);
          }
        }
        vm.stack = temp;
      };

      vm.clearStack = function() {
        vm.stack = [];
      };

      vm.createSendCommand = function(command){

          var nonBlankProps = [];

          for (var i = 0; i < command.properties.length; i += 1){
            if (command.properties[i] !== ''){
              nonBlankProps.push(command.properties[i]);
            }
          }

          var send = '1 ' + nonBlankProps.join('*') + ' ' + command.command + ' ' + command.attributes;

          console.log(send);

          return send;
      };

      vm.sendCommand = function(command) {
        if (vm.ip !== '') {
          rendererService.render({
            ip: vm.ip,
            command: vm.createSendCommand(command)
          }).then(function(response) {
            vm.response = response;
          });
        }
      };

      /* Slots are hard coded with commands for RENDERER*MAIN_LAYER*SCRIPT INVOKE WhateverCommand for an example. Future versions should send COMMAND_INFO on the fly to populate the dropdowns */

      vm.slots = [
        [
          {value: '#OBJECTID', type: 'property', description: '', arguments: ''},
          {value: 'ALL_TABLE',type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION*KEY*$', type: 'property', description: 'access keyframe by name (a director name/path may be specified as $director_path$key_name)', arguments: ''},
          {value: 'ARCHIVE', type: 'property', description: '', arguments: ''},
          {value: 'AUDIO', type: 'property', description: '', arguments: ''},
          {value: 'AUDIO_CLIP', type: 'property', description: '', arguments: ''},
          {value: 'AUTOKEYWORD', type: 'property', description: '', arguments: ''},
          {value: 'BACK_SCENE', type: 'property', description: '', arguments: ''},
          {value: 'BASE_FONT', type: 'property', description: '', arguments: ''},
          {value: 'BGL_COMPATIBILITY', type: 'property', description: '', arguments: ''},
          {value: 'BUILT_IN', type: 'property', description: '', arguments: ''},
          {value: 'CHAR_STYLE', type: 'property', description: '', arguments: ''},
          {value: 'CLOCK', type: 'property', description: '', arguments: ''},
          {value: 'CLOCK%1', type: 'property', description: '', arguments: ''},
          {value: 'CLOCK*DATA', type: 'property', description: '', arguments: ''},
          {value: 'CLR', type: 'property', description: '', arguments: ''},
          {value: 'CMD_RECORD', type: 'property', description: '', arguments: ''},
          {value: 'COMMANDS_XML', type: 'property', description: 'Describes the command interface of this object', arguments: ''},
          {value: 'CONFIGURATION', type: 'property', description: '', arguments: ''},
          {value: 'CONSOLE', type: 'property', description: '', arguments: ''},
          {value: 'CONTAINER', type: 'property', description: '', arguments: ''},
          {value: 'DATABASE', type: 'property', description: '', arguments: ''},
          {value: 'DEBUG_CONTROL', type: 'property', description: '', arguments: ''},
          {value: 'DEBUG_PUSH', type: 'property', description: '', arguments: ''},
          {value: 'DEVICE', type: 'property', description: '', arguments: ''},
          {value: 'DIRECTORY', type: 'property', description: '', arguments: ''},
          {value: 'EDITOR', type: 'property', description: '', arguments: ''},
          {value: 'EVS', type: 'property', description: '', arguments: ''},
          {value: 'FEEDBACK', type: 'property', description: '', arguments: ''},
          {value: 'FEEDBACKUNICAST', type: 'property', description: '', arguments: ''},
          {value: 'FONT', type: 'property', description: '', arguments: ''},
          {value: 'FRONT_SCENE', type: 'property', description: '', arguments: ''},
          {value: 'FUNCTION', type: 'property', description: '', arguments: ''},
          {value: 'GEOM', type: 'property', description: '', arguments: ''},
          {value: 'GLOBAL', type: 'property', description: '', arguments: ''},
          {value: 'GUI*PID', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*GRAPHICS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_CLIPIN_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_CLIPOUT_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_GFX_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_GPUS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_STREAMIN_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_VIDEO_INPUTS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*NUMBER_VIDEOIN_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*SYSTEM', type: 'property', description: '', arguments: ''},
          {value: 'HARDWARE*VIDEO_OUTPUT', type: 'property', description: '', arguments: ''},
          {value: 'IMAGE', type: 'property', description: '', arguments: ''},
          {value: 'LOCATION', type: 'property', description: '', arguments: ''},
          {value: 'LOG', type: 'property', description: '', arguments: ''},
          {value: 'MAGIC', type: 'property', description: '', arguments: ''},
          {value: 'MAIN', type: 'property', description: '', arguments: ''},
          {value: 'MAIN_SCENE', type: 'property', description: '', arguments: ''},
          {value: 'MATERIAL', type: 'property', description: '', arguments: ''},
          {value: 'MATERIAL_ADVANCED', type: 'property', description: '', arguments: ''},
          {value: 'MEDIA_PREVIEW', type: 'property', description: '', arguments: ''},
          {value: 'MEMORY', type: 'property', description: '', arguments: ''},
          {value: 'MODIFIER', type: 'property', description: '', arguments: ''},
          {value: 'MUX', type: 'property', description: '', arguments: ''},
          {value: 'OBJECT_ID', type: 'property', description: '', arguments: ''},
          {value: 'OBJECT_TYPE', type: 'property', description: 'What type of object is this', arguments: ''},
          {value: 'ONAIR', type: 'property', description: '', arguments: ''},
          {value: 'PLATFORM', type: 'property', description: '', arguments: ''},
          {value: 'PLAY', type: 'property', description: '', arguments: ''},
          {value: 'PLUGIN_MANAGER', type: 'property', description: '', arguments: ''},
          {value: 'POOLS', type: 'property', description: '', arguments: ''},
          {value: 'POSTRENDERER', type: 'property', description: '', arguments: ''},
          {value: 'PROCESS*MEMORY', type: 'property', description: '', arguments: ''},
          {value: 'REND', type: 'property', description: '', arguments: ''},
          {value: 'RENDER_TO_DISK', type: 'property', description: '', arguments: ''},
          {value: 'RENDERER', type: 'property', description: '', arguments: ''},
          {value: 'SCENE', type: 'property', description: '', arguments: ''},
          {value: 'SCENE_EDITOR', type: 'property', description: '', arguments: ''},
          {value: 'SCENE_RENDERER', type: 'property', description: '', arguments: ''},
          {value: 'SHADER', type: 'property', description: '', arguments: ''},
          {value: 'STAGE_EVENTS', type: 'property', description: 'Access to the stage events.', arguments: ''},
          {value: 'SUBSTANCE', type: 'property', description: '', arguments: ''},
          {value: 'SUGGESTION', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM*CHANNEL*%1', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM*FLICKER_FILTER_SUPPORTED', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM*HARDWARE_TYPE', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM*MEMORY', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM*MEMORY_ADVANCED', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM_GLOBALS*EDITOR_SIZE', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM_GLOBALS*OUTPUT_POS', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM_GLOBALS*OUTPUT_SIZE', type: 'property', description: '', arguments: ''},
          {value: 'SYSTEM_GLOBALS*SHOW_MOUSE_CURSOR', type: 'property', description: 'Shows/Hides the mouse cursor in the on-air output window.', arguments: ''},
          {value: 'TC', type: 'property', description: '', arguments: ''},
          {value: 'TEST_SIGNALS', type: 'property', description: '', arguments: ''},
          {value: 'TEXTURE*MEMORY', type: 'property', description: '', arguments: ''},
          {value: 'TRIO', type: 'property', description: '', arguments: ''},
          {value: 'UNDOREDO', type: 'property', description: '', arguments: ''},
          {value: 'VERSIONS', type: 'property', description: '', arguments: ''},
          {value: 'VIDEO_CLIP', type: 'property', description: '', arguments: ''},
          {value: 'VIZ2POINTX_MODE', type: 'property', description: '', arguments: ''},
          {value: 'VIZ_COMMUNICATION', type: 'property', description: '', arguments: ''},
          {value: 'VIZ_PROGRAMDATA_FOLDER', type: 'property', description: 'Folder where VizArtist/Engine stores its machine specific data', arguments: ''},
          {value: 'VIZ_PUBLICDOCUMENTS_FOLDER', type: 'property', description: '', arguments: ''},
          {value: 'VIZONE', type: 'property', description: '', arguments: ''},
          {value: 'VTS', type: 'property', description: '', arguments: ''},
          {value: '{UUID}', type: 'property', description: '', arguments: ''}
        ],
        [
          {value: '#OBJECTID', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION*', type: 'property', description: 'Accesses a channel by name.', arguments: ''},
          {value: 'ANIMATION*CHANNEL*$', type: 'property', description: 'access channel by name (a director name/path may be specified as $director_path$channel_name)', arguments: ''},
          {value: 'ANIMATION*CHANNEL_FORCED*$', type: 'property', description: 'access channel by name (a director name/path may be specified as $director_path$channel_name)', arguments: ''},
          {value: 'ANIMATION*KEY', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION*KEY*', type: 'property', description: 'Accesses a keyframe by name. A director name/path may be specified as $director_path$key_name.', arguments: ''},
          {value: 'ANIMATION*KEY*$', type: 'property', description: 'access keyframe by name (a director name/path may be specified as $director_path$key_name)', arguments: ''},
          {value: 'ANIMATION*OFFSET', type: 'property', description: '', arguments: ''},
          {value: 'AUTO_KEY_POS', type: 'property', description: 'This object controls the auto key function', arguments: ''},
          {value: 'BACK_LAYER', type: 'property', description: 'Controls the scene in the back layer', arguments: ''},
          {value: 'BACK_LAYER*EYE_SEPARATION', type: 'property', description: '', arguments: ''},
          {value: 'BACK_LAYER*LAYER_VISIBLE', type: 'property', description: '', arguments: ''},
          {value: 'BACK_LAYER*OVERWRITE_STEREO', type: 'property', description: '', arguments: ''},
          {value: 'BACK_LAYER*ZERO_PARALLAX_DIST', type: 'property', description: '', arguments: ''},
          {value: 'BACKGROUND*ALPHA', type: 'property', description: 'What is the default alpha value after clear screen', arguments: ''},
          {value: 'BACKGROUND*COLOR', type: 'property', description: 'Color of the background', arguments: ''},
          {value: 'BACKGROUND*IMAGE', type: 'property', description: 'Clear the background image', arguments: ''},
          {value: 'BACKGROUND*IMAGE*ACTIVE', type: 'property', description: 'Is the background image active', arguments: ''},
          {value: 'CAMERA%1', type: 'property', description: 'Cameras in the scene', arguments: ''},
          {value: 'CAMERA*DATA', type: 'property', description: 'Get the data of all cameras of the scene with a single command', arguments: ''},
          {value: 'CAMERA_ASPECT', type: 'property', description: 'The camera aspect', arguments: ''},
          {value: 'CAMERA_FAR', type: 'property', description: 'The far value of the camera space. No object in behind the far value will be visible.', arguments: ''},
          {value: 'CAMERA_NEAR', type: 'property', description: 'The near value of the camera space. No object in front of the near value will be visible.', arguments: ''},
          {value: 'CLIPPER%1', type: 'property', description: 'Clipper', arguments: ''},
          {value: 'CLIPPER*DATA', type: 'property', description: 'Get data of all clipper objects.', arguments: ''},
          {value: 'COLOR_CORRECTION_BIAS', type: 'property', description: 'color correction bias', arguments: ''},
          {value: 'COLOR_CORRECTION_SCALE', type: 'property', description: 'color correction scale', arguments: ''},
          {value: 'COMMANDS_XML', type: 'property', description: 'Describes the command interface of this object', arguments: ''},
          {value: 'CONTAINERSCRIPTS', type: 'property', description: '', arguments: ''},
          {value: 'CONTENTS_VISIBLE', type: 'property', description: '', arguments: ''},
          {value: 'CONTROL', type: 'property', description: 'Access sub-location by a previously defined control name', arguments: ''},
          {value: 'COORDINATE_SYSTEM', type: 'property', description: '', arguments: ''},
          {value: 'CSC', type: 'property', description: 'The Center Shift Calibration Marker', arguments: ''},
          {value: 'CULLING', type: 'property', description: '', arguments: ''},
          {value: 'CURRENT_CAMERA', type: 'property', description: 'This current camera', arguments: ''},
          {value: 'CURRENT_CAMERA*EYE_SEPARATION', type: 'property', description: '', arguments: ''},
          {value: 'CURRENT_CAMERA*STEREO_METHOD', type: 'property', description: '', arguments: ''},
          {value: 'CURRENT_CAMERA*ZERO_PARALLAX_DIST', type: 'property', description: '', arguments: ''},
          {value: 'DEFAULT_CAMERA', type: 'property', description: 'This camera is active when the scene is loaded', arguments: ''},
          {value: 'DEFOCUS_BLUR', type: 'property', description: 'the blur factor applied to bg scenes when defocus is active', arguments: ''},
          {value: 'DEFOCUS_MODE', type: 'property', description: 'Setting the defocus mode', arguments: ''},
          {value: 'DEPTH_BUFFER', type: 'property', description: 'Obsolete: use DEPTH_BUFFER_STATE instead', arguments: ''},
          {value: 'DEPTH_BUFFER_STATE', type: 'property', description: 'Should we use the depth buffer for rendering', arguments: ''},
          {value: 'EDITED_OBJECT', type: 'property', description: '', arguments: ''},
          {value: 'EDITED_OBJECTS', type: 'property', description: '', arguments: ''},
          {value: 'EDITED_PATH_HANDLE', type: 'property', description: '', arguments: ''},
          {value: 'ENABLE_SHADOWS', type: 'property', description: 'Are we allowed to render shadows in the scene', arguments: ''},
          {value: 'EXTRA_INFO', type: 'property', description: '', arguments: ''},
          {value: 'EYE_SEPARATION', type: 'property', description: '', arguments: ''},
          {value: 'FILE_LINKS', type: 'property', description: '', arguments: ''},
          {value: 'FLICKER_FILTER', type: 'property', description: 'Flicker filter value', arguments: ''},
          {value: 'FORCE_DRAW_OUTLINE', type: 'property', description: '', arguments: ''},
          {value: 'FOREGROUND*IMAGE', type: 'property', description: 'Clear the foreground image', arguments: ''},
          {value: 'FOREGROUND*IMAGE*ACTIVE', type: 'property', description: 'Is the foreground image active', arguments: ''},
          {value: 'FRAME_RATE', type: 'property', description: '', arguments: ''},
          {value: 'FRONT_LAYER', type: 'property', description: 'Controls the scene in the front layer', arguments: ''},
          {value: 'FRONT_LAYER*EYE_SEPARATION', type: 'property', description: '', arguments: ''},
          {value: 'FRONT_LAYER*LAYER_VISIBLE', type: 'property', description: '', arguments: ''},
          {value: 'FRONT_LAYER*OVERWRITE_STEREO', type: 'property', description: '', arguments: ''},
          {value: 'FRONT_LAYER*ZERO_PARALLAX_DIST', type: 'property', description: '', arguments: ''},
          {value: 'FUNCTION', type: 'property', description: 'Functionplugins that are assigned to the scene', arguments: ''},
          {value: 'GAMMA', type: 'property', description: 'gamma value', arguments: ''},
          {value: 'GFX*%1', type: 'property', description: 'Graphics channels available', arguments: ''},
          {value: 'GLOBALS', type: 'property', description: 'Global scene data.', arguments: ''},
          {value: 'GRID', type: 'property', description: '', arguments: ''},
          {value: 'GRID*SELECT', type: 'property', description: '', arguments: ''},
          {value: 'HUD', type: 'property', description: 'The Head Up Display', arguments: ''},
          {value: 'IGNORE_GUI_REBUILD', type: 'property', description: '', arguments: ''},
          {value: 'INFOTEXT', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*COMMAND', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*DIRECTOR', type: 'property', description: 'Director Name To Initialize', arguments: ''},
          {value: 'INITIALIZE*FREQUENCY', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*LOAD', type: 'property', description: 'initialize the scene on load', arguments: ''},
          {value: 'INITIALIZE*TYPE', type: 'property', description: 'Defines the what to init, Stage or Director', arguments: ''},
          {value: 'KEEP_STORED_ORTHO_FRUSTUM', type: 'property', description: 'Keeps the orthogonal frustum stored in the scene', arguments: ''},
          {value: 'KEY_INTERNAL', type: 'property', description: '', arguments: ''},
          {value: 'KEY_INTERNAL*ACTIVE', type: 'property', description: '', arguments: ''},
          {value: 'KEY_RENDERMODE', type: 'property', description: '', arguments: ''},
          {value: 'LAYOUT*NUMBER', type: 'property', description: 'The number of the render layout of the scene. This is used in Viz Engine multi pipe render mode', arguments: ''},
          {value: 'LAYOUT*TYPE', type: 'property', description: 'The type of the render layout of the scene. This is used in Viz Engine multi pipe render mode', arguments: ''},
          {value: 'LIGHT%1', type: 'property', description: 'Lights in the scene', arguments: ''},
          {value: 'LIGHT*DATA', type: 'property', description: 'Get the data of all lights of the scene with a single command', arguments: ''},
          {value: 'LOCATION_PATH', type: 'property', description: '', arguments: ''},
          {value: 'MAIN_LAYER', type: 'property', description: 'Controls the scene in the main layer', arguments: ''},
          {value: 'MAIN_LAYER*EYE_SEPARATION', type: 'property', description: '', arguments: ''},
          {value: 'MAIN_LAYER*LAYER_VISIBLE', type: 'property', description: '', arguments: ''},
          {value: 'MAIN_LAYER*OVERWRITE_STEREO', type: 'property', description: '', arguments: ''},
          {value: 'MAIN_LAYER*ZERO_PARALLAX_DIST', type: 'property', description: '', arguments: ''},
          {value: 'MAP', type: 'property', description: 'Accesses the scenes shared memory map (used by scripts and plugins).', arguments: ''},
          {value: 'MASK_INVERT', type: 'property', description: 'Should a layer of the mask be inverted', arguments: ''},
          {value: 'MEDIA_ASSETS', type: 'property', description: 'Manager for all media sources', arguments: ''},
          {value: 'MERGE_STYLE', type: 'property', description: '', arguments: ''},
          {value: 'MIDDLE_LAYER', type: 'property', description: 'for Trio', arguments: ''},
          {value: 'NAME', type: 'property', description: '', arguments: ''},
          {value: 'NO_GFX_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'NUMBER_OF_MASK_BITS', type: 'property', description: 'How many mask layers do we have available', arguments: ''},
          {value: 'OBJECT_ID', type: 'property', description: '', arguments: ''},
          {value: 'OBJECT_TYPE', type: 'property', description: 'What type of object is this', arguments: ''},
          {value: 'OUTPUT_REGION', type: 'property', description: 'Output Region', arguments: ''},
          {value: 'OVERWRITE_STEREO', type: 'property', description: '', arguments: ''},
          {value: 'PICK_LAYER', type: 'property', description: '', arguments: ''},
          {value: 'PICK_QUAD', type: 'property', description: 'Set the Pick Quad for chroma key active or inactive', arguments: ''},
          {value: 'PICK_QUAD_DATA', type: 'property', description: 'Set the Pick Quad Positiion and Size', arguments: ''},
          {value: 'POST', type: 'property', description: '', arguments: ''},
          {value: 'POST*STATUS', type: 'property', description: '', arguments: ''},
          {value: 'POST_MODE', type: 'property', description: '', arguments: ''},
          {value: 'RAMPLER*ACTIVE', type: 'property', description: 'Is the Rampler active in that scene', arguments: ''},
          {value: 'RAMPLER*BEGIN', type: 'property', description: 'Define the begin time the Rampler will record', arguments: ''},
          {value: 'RAMPLER*BOTTOM', type: 'property', description: 'Define the bottom side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*END', type: 'property', description: 'Define the end time the Rampler will record', arguments: ''},
          {value: 'RAMPLER*LEFT', type: 'property', description: 'Define the left side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*RIGHT', type: 'property', description: 'Define the right side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*TOP', type: 'property', description: 'Define the top side of the Rampler Area', arguments: ''},
          {value: 'RESET_CLIP_CHANNELS_ON_SET_SCENE', type: 'property', description: '', arguments: ''},
          {value: 'RINGING_FILTER', type: 'property', description: 'ringing filter', arguments: ''},
          {value: 'S2V*%1', type: 'property', description: 'Define the studio to virtual settings', arguments: ''},
          {value: 'S2V*INDEX', type: 'property', description: 'Define the index of the studio to virtual settings', arguments: ''},
          {value: 'SAA', type: 'property', description: 'Are we able to render software', arguments: ''},
          {value: 'SAA*ACTIVE', type: 'property', description: 'Do we render with software scene antialiasing', arguments: ''},
          {value: 'SAA*SAMPLES', type: 'property', description: 'How many samples do we want to use', arguments: ''},
          {value: 'SCENE_DATA', type: 'property', description: '', arguments: ''},
          {value: 'SCRIPT', type: 'property', description: 'The scene script', arguments: ''},
          {value: 'SCRIPT_COLOR_OLD', type: 'property', description: '', arguments: ''},
          {value: 'SELF_LAYER', type: 'property', description: '', arguments: ''},
          {value: 'SELF_LAYER_CAMERA', type: 'property', description: '', arguments: ''},
          {value: 'SHADOW_TYPE', type: 'property', description: 'Stencil based flat shadows or shadow mapping', arguments: ''},
          {value: 'SHORTCUTS', type: 'property', description: '', arguments: ''},
          {value: 'STAGE', type: 'property', description: 'Animation control of the scene', arguments: ''},
          {value: 'STEREO_PARAMETERS', type: 'property', description: '', arguments: ''},
          {value: 'TARGA3200', type: 'property', description: 'Targa3200', arguments: ''},
          {value: 'TEXT_EDITOR', type: 'property', description: '', arguments: ''},
          {value: 'TREE', type: 'property', description: 'Container tree of the scene', arguments: ''},
          {value: 'UPDATE', type: 'property', description: '', arguments: ''},
          {value: 'USE_AUTO_KEY', type: 'property', description: 'Should the auto key rendering method be used', arguments: ''},
          {value: 'USER_ASPECT', type: 'property', description: 'The camera aspect set by the user', arguments: ''},
          {value: 'UUID', type: 'property', description: '', arguments: ''},
          {value: 'VERSION', type: 'property', description: '', arguments: ''},
          {value: 'VGA_PREVIEW', type: 'property', description: '', arguments: ''},
          {value: 'VIDEO', type: 'property', description: 'Video', arguments: ''},
          {value: 'VIDEO*%1*FORMAT', type: 'property', description: 'What video format should be used in this scene for a certain input', arguments: ''},
          {value: 'VIDEO*%1*MODE', type: 'property', description: 'What video mode should be used in this scene for a certain input', arguments: ''},
          {value: 'VIEW', type: 'property', description: '', arguments: ''},
          {value: 'ZERO_PARALLAX_DIST', type: 'property', description: '', arguments: ''},
          {value: '{UUID}', type: 'property', description: '', arguments: ''}
        ],
        [
          {value: '#OBJECTID', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION*', type: 'property', description: 'Accesses a channel by name.', arguments: ''},
          {value: 'ANIMATION*CHANNEL*$', type: 'property', description: 'access channel by name (a director name/path may be specified as $director_path$channel_name)', arguments: ''},
          {value: 'ANIMATION*CHANNEL_FORCED*$', type: 'property', description: 'access channel by name (a director name/path may be specified as $director_path$channel_name)', arguments: ''},
          {value: 'ANIMATION*KEY', type: 'property', description: '', arguments: ''},
          {value: 'ANIMATION*KEY*', type: 'property', description: 'Accesses a keyframe by name. A director name/path may be specified as $director_path$key_name.', arguments: ''},
          {value: 'ANIMATION*KEY*$', type: 'property', description: 'access keyframe by name (a director name/path may be specified as $director_path$key_name)', arguments: ''},
          {value: 'ANIMATION*OFFSET', type: 'property', description: '', arguments: ''},
          {value: 'AUTO_KEY_POS', type: 'property', description: 'This object controls the auto key function', arguments: ''},
          {value: 'BACKGROUND*ALPHA', type: 'property', description: 'What is the default alpha value after clear screen', arguments: ''},
          {value: 'BACKGROUND*COLOR', type: 'property', description: 'Color of the background', arguments: ''},
          {value: 'BACKGROUND*IMAGE', type: 'property', description: 'Clear the background image', arguments: ''},
          {value: 'BACKGROUND*IMAGE*ACTIVE', type: 'property', description: 'Is the background image active', arguments: ''},
          {value: 'CAMERA%1', type: 'property', description: 'Cameras in the scene', arguments: ''},
          {value: 'CAMERA*DATA', type: 'property', description: 'Get the data of all cameras of the scene with a single command', arguments: ''},
          {value: 'CAMERA_ASPECT', type: 'property', description: 'The camera aspect', arguments: ''},
          {value: 'CAMERA_FAR', type: 'property', description: 'The far value of the camera space. No object in behind the far value will be visible.', arguments: ''},
          {value: 'CAMERA_NEAR', type: 'property', description: 'The near value of the camera space. No object in front of the near value will be visible.', arguments: ''},
          {value: 'CLIPPER%1', type: 'property', description: 'Clipper', arguments: ''},
          {value: 'CLIPPER*DATA', type: 'property', description: 'Get data of all clipper objects.', arguments: ''},
          {value: 'COLOR_CORRECTION_BIAS', type: 'property', description: 'color correction bias', arguments: ''},
          {value: 'COLOR_CORRECTION_SCALE', type: 'property', description: 'color correction scale', arguments: ''},
          {value: 'COMMANDS_XML', type: 'property', description: 'Describes the command interface of this object', arguments: ''},
          {value: 'CONTAINERSCRIPTS', type: 'property', description: '', arguments: ''},
          {value: 'CONTROL', type: 'property', description: 'Access sub-location by a previously defined control name', arguments: ''},
          {value: 'CULLING', type: 'property', description: '', arguments: ''},
          {value: 'CURRENT_CAMERA', type: 'property', description: 'This current camera', arguments: ''},
          {value: 'DEFAULT_CAMERA', type: 'property', description: 'This camera is active when the scene is loaded', arguments: ''},
          {value: 'DEFOCUS_BLUR', type: 'property', description: 'the blur factor applied to bg scenes when defocus is active', arguments: ''},
          {value: 'DEFOCUS_MODE', type: 'property', description: 'Setting the defocus mode', arguments: ''},
          {value: 'DEPTH_BUFFER', type: 'property', description: 'Obsolete: use DEPTH_BUFFER_STATE instead', arguments: ''},
          {value: 'DEPTH_BUFFER_STATE', type: 'property', description: 'Should we use the depth buffer for rendering', arguments: ''},
          {value: 'EDITED_OBJECT', type: 'property', description: '', arguments: ''},
          {value: 'EDITED_OBJECTS', type: 'property', description: '', arguments: ''},
          {value: 'EDITED_PATH_HANDLE', type: 'property', description: '', arguments: ''},
          {value: 'ENABLE_SHADOWS', type: 'property', description: 'Are we allowed to render shadows in the scene', arguments: ''},
          {value: 'EXTRA_INFO', type: 'property', description: '', arguments: ''},
          {value: 'FILE_LINKS', type: 'property', description: '', arguments: ''},
          {value: 'FLICKER_FILTER', type: 'property', description: 'Flicker filter value', arguments: ''},
          {value: 'FORCE_DRAW_OUTLINE', type: 'property', description: '', arguments: ''},
          {value: 'FOREGROUND*IMAGE', type: 'property', description: 'Clear the foreground image', arguments: ''},
          {value: 'FOREGROUND*IMAGE*ACTIVE', type: 'property', description: 'Is the foreground image active', arguments: ''},
          {value: 'FRAME_RATE', type: 'property', description: '', arguments: ''},
          {value: 'FUNCTION', type: 'property', description: 'Functionplugins that are assigned to the scene', arguments: ''},
          {value: 'GAMMA', type: 'property', description: 'gamma value', arguments: ''},
          {value: 'GFX*%1', type: 'property', description: 'Graphics channels available', arguments: ''},
          {value: 'GLOBALS', type: 'property', description: 'Global scene data.', arguments: ''},
          {value: 'GRID', type: 'property', description: '', arguments: ''},
          {value: 'GRID*SELECT', type: 'property', description: '', arguments: ''},
          {value: 'IGNORE_GUI_REBUILD', type: 'property', description: '', arguments: ''},
          {value: 'INFOTEXT', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*COMMAND', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*DIRECTOR', type: 'property', description: 'Director Name To Initialize', arguments: ''},
          {value: 'INITIALIZE*FREQUENCY', type: 'property', description: '', arguments: ''},
          {value: 'INITIALIZE*LOAD', type: 'property', description: 'initialize the scene on load', arguments: ''},
          {value: 'INITIALIZE*TYPE', type: 'property', description: 'Defines the what to init, Stage or Director', arguments: ''},
          {value: 'KEEP_STORED_ORTHO_FRUSTUM', type: 'property', description: 'Keeps the orthogonal frustum stored in the scene', arguments: ''},
          {value: 'KEY_RENDERMODE', type: 'property', description: '', arguments: ''},
          {value: 'LAYOUT*NUMBER', type: 'property', description: 'The number of the render layout of the scene. This is used in Viz Engine multi pipe render mode', arguments: ''},
          {value: 'LAYOUT*TYPE', type: 'property', description: 'The type of the render layout of the scene. This is used in Viz Engine multi pipe render mode', arguments: ''},
          {value: 'LIGHT%1', type: 'property', description: 'Lights in the scene', arguments: ''},
          {value: 'LIGHT*DATA', type: 'property', description: 'Get the data of all lights of the scene with a single command', arguments: ''},
          {value: 'LOCATION_PATH', type: 'property', description: '', arguments: ''},
          {value: 'MAP', type: 'property', description: 'Accesses the scenes shared memory map (used by scripts and plugins).', arguments: ''},
          {value: 'MASK_INVERT', type: 'property', description: 'Should a layer of the mask be inverted', arguments: ''},
          {value: 'MEDIA_ASSETS', type: 'property', description: 'Manager for all media sources', arguments: ''},
          {value: 'MERGE_STYLE', type: 'property', description: '', arguments: ''},
          {value: 'NAME', type: 'property', description: '', arguments: ''},
          {value: 'NO_GFX_CHANNELS', type: 'property', description: '', arguments: ''},
          {value: 'NUMBER_OF_MASK_BITS', type: 'property', description: 'How many mask layers do we have available', arguments: ''},
          {value: 'OBJECT_ID', type: 'property', description: '', arguments: ''},
          {value: 'OBJECT_TYPE', type: 'property', description: 'What type of object is this', arguments: ''},
          {value: 'OUTPUT_REGION', type: 'property', description: 'Output Region', arguments: ''},
          {value: 'RAMPLER*ACTIVE', type: 'property', description: 'Is the Rampler active in that scene', arguments: ''},
          {value: 'RAMPLER*BEGIN', type: 'property', description: 'Define the begin time the Rampler will record', arguments: ''},
          {value: 'RAMPLER*BOTTOM', type: 'property', description: 'Define the bottom side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*END', type: 'property', description: 'Define the end time the Rampler will record', arguments: ''},
          {value: 'RAMPLER*LEFT', type: 'property', description: 'Define the left side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*RIGHT', type: 'property', description: 'Define the right side of the Rampler Area', arguments: ''},
          {value: 'RAMPLER*TOP', type: 'property', description: 'Define the top side of the Rampler Area', arguments: ''},
          {value: 'RESET_CLIP_CHANNELS_ON_SET_SCENE', type: 'property', description: '', arguments: ''},
          {value: 'RINGING_FILTER', type: 'property', description: 'ringing filter', arguments: ''},
          {value: 'S2V*%1', type: 'property', description: 'Define the studio to virtual settings', arguments: ''},
          {value: 'S2V*INDEX', type: 'property', description: 'Define the index of the studio to virtual settings', arguments: ''},
          {value: 'SCENE_DATA', type: 'property', description: '', arguments: ''},
          {value: 'SCRIPT', type: 'property', description: 'The scene script', arguments: ''},
          {value: 'SCRIPT_COLOR_OLD', type: 'property', description: '', arguments: ''},
          {value: 'SELF_LAYER', type: 'property', description: '', arguments: ''},
          {value: 'SELF_LAYER_CAMERA', type: 'property', description: '', arguments: ''},
          {value: 'SHADOW_TYPE', type: 'property', description: 'Stencil based flat shadows or shadow mapping', arguments: ''},
          {value: 'STAGE', type: 'property', description: 'Animation control of the scene', arguments: ''},
          {value: 'TARGA3200', type: 'property', description: 'Targa3200', arguments: ''},
          {value: 'TREE', type: 'property', description: 'Container tree of the scene', arguments: ''},
          {value: 'USE_AUTO_KEY', type: 'property', description: 'Should the auto key rendering method be used', arguments: ''},
          {value: 'USER_ASPECT', type: 'property', description: 'The camera aspect set by the user', arguments: ''},
          {value: 'UUID', type: 'property', description: '', arguments: ''},
          {value: 'VERSION', type: 'property', description: '', arguments: ''},
          {value: 'VIDEO', type: 'property', description: '', arguments: ''},
          {value: 'VIDEO*%1*FORMAT', type: 'property', description: 'What video format should be used in this scene for a certain input', arguments: ''},
          {value: 'VIDEO*%1*MODE', type: 'property', description: 'What video mode should be used in this scene for a certain input', arguments: ''},
          {value: '{UUID}', type: 'property', description: '', arguments: ''}
        ],
        [
          {value: 'COMMAND_INFO', type: 'command', description: 'Returns help on a command or location.', arguments: '{STRING} default=NULL, {ENUM} {ALL | ANIMATABLE | COMMANDS | ONE_LEVEL | PROPERTIES} default="ALL",{line_width as UINT}(min=40;max=254) default=80,{ENUM} {DEFAULT | NO_SPACING | SIMPLE | SPACING-%d | TAB-%d} default="DEFAULT"'},
          {value: 'INVOKE', type: 'command', description: 'call a script procedure', arguments: '{function-name as STRING},{argument-string as ARGUMENT-LIST}'},
          {value: 'LOAD_PLUGIN_SOURCE', type: 'command', description: 'load the source from the specified script plugin', arguments: '{plugin_name as STRING},{ENUM} {ADD | REPLACE} default="REPLACE"'},
          {value: 'MAKE_PLUGIN', type: 'command', description: 'transform this script into a plugin', arguments: '{folder/name as STRING}'},
          {value: 'SET_CHANGED', type: 'command', description: 'calls set_changed()', arguments: ''}
        ]
      ];

      $scope.vm = vm;
    }
  ]);
