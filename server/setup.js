module.exports = function(app, express) {

	//CORS - cross domain access to PUT and DELETE, send headers and respond to initial OPTIONS request with a 200 return
	app.use(function(req, res, next) {

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

		// Website you wish to allow to connect
		if (req.method === 'OPTIONS') {
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
			res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
			return res.send(200);
		}

		return next();
	});

	app.use(express.compress());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/public');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
};
