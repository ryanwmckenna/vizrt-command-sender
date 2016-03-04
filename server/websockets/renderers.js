var net = require('net');

module.exports = function(io, client) {

  return {
    sendToRenderer: function(options, callback) {
      // console.log(options);

      var newSocket = net.Socket();
      var returnData = '';

      //console.log('RENDERING... ' + template.command + ' to ' + template.ip);

      newSocket.on('error', function(err) {
        //console.log('error... ' + err.toString());

        newSocket.destroy();
        newSocket = null;

        if (callback) {
          callback(new Error('render failure for ' + options.command + ' on ip ' + options.ip));
        }
      });

      newSocket.on('close', function() {
        //console.log('closed...');
      });

      newSocket.on('data', function(data) {
        //console.log('returning... ' + data.toString());
        returnData += data.toString();

        //flush any remaining data
        newSocket.end();
      });

      newSocket.on('end', function(data) {
        //console.log('returning... ' + returnData);
        //console.log('----------');
        newSocket.destroy();
        newSocket = null;

        if (callback) {
          callback(returnData);
        }
      });

      newSocket.on('connect', function(e) {
        //console.log('writing...');
        newSocket.write(new Buffer(options.command + '\0'));
      });

      //console.log('connecting... ' + template.ip);
      newSocket.connect(6100, options.ip);
    }
  };
}
