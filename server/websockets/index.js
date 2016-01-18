module.exports = function(io, client) {

  var renderers = require('./renderers')(io, client);

  var camelCased = function(string) {
    return string.replace(/-([a-z])/g, function(s) {
      return s[1].toUpperCase();
    });
  };

  io.sockets.on('connection', function(socket) {
    socket.on('render', function(data, callback) {
      renderers[camelCased(data.type)](data.options, callback);
    });
  });
};
