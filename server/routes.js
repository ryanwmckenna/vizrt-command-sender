module.exports = function(app) {

	//CLIENT pages
	app.get('/', function(req, res) {
		res.render('index.html');
	});
}
