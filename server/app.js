var express = require('express'),
    app = express(),
    errorHandler,
    http = require('http'),
    server = http.createServer(app),
    port = Number(process.env.PORT || 11000);

//Catch any exceptions we might have missed
process.on('uncaughtException', function(err) {
    console.log(err);
    process.exit(1);
});

//set up CORS headers (dev only) and express rendering
require('./setup')(app, express);

//init Socket.IO and link to http server
var io = require('socket.io')(server, {
    transports: ['websocket', 'polling-xhr', 'polling']
});

//init routes for servering initial command sender page
require('./routes')(app, io, express);

//set up web socket handler to receive Viz commands
require('./websockets')(io);

//start http server listening
server.listen(port, function() {
    console.log('App listening on ' + port);
});
