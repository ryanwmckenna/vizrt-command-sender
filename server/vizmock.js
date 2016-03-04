var net = require("net"),
	port = Number(process.env.PORT || 6100);

process.on('uncaughtException', function(err) {
	console.log(err);
});

var clock;

var time = 0;

var relay = net.createServer(function(socket) {

	console.log("connected");

	socket.on("data", function(data) {
		console.log("rendering:" + data.toString() + ":");
		console.log('++++++++++++++++++++++++++++');
		socket.write('1 returnvalue' + '\0');
	});

	socket.on("error", function(error) {

		console.log("error - " + error);
	});

	socket.on("close", function(data) {

		console.log("closed");
		socket.removeAllListeners();
	});

}).listen(port, function() {
	console.log("Fake TCP Renderer listening on " + port);
});