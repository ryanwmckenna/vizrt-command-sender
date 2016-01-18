var cluster = require('cluster'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app)
port = Number(process.env.PORT || 7000),
redis = require('redis'),
redisAdapter = require('socket.io-redis'),
renderClient = redis.createClient(6379, 'localhost', {
    detect_buffers: true
}),
pub = redis.createClient(6379, 'localhost', {
    detect_buffers: true
}),
sub = redis.createClient(6379, 'localhost', {
    detect_buffers: true
});

//Catch any exceptions we might have missed
process.on('uncaughtException', function(err) {
    process.exit(1);
});

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function(worker) {
        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

} else {

    //console.log('Worker ' + cluster.worker.id + ' running... :)');

    //set up CORS headers (dev only) and express rendering
    require('./setup')(app, express);

    //init Socket.IO and link to http server
    var io = require('socket.io')(server, {
        transports: ['websocket', 'polling-xhr', 'polling']
    });

    //connect redis service
    io.adapter(redisAdapter({
        pubClient: pub,
        subClient: sub
    }));

    //init routes for servering initial command sender page
    require('./routes')(app, io, express);

    //set up web socket handler to receive Viz commands
    require('./websockets')(io, renderClient);

    //start http server listening
    server.listen(port, function() {
        console.log('App listening on ' + port);
    });
}
