/*
 * routes.js - module to provide routing
*/

/*jslint          node: true,          continue: true,
  devel: true,    indent: 2,           maxerr: 50,
  newcap: true,   nomen: true,         plusplus: true,
  regex: true,    sloppy: true,        vars: false,
  white: true
*/
/*global */

//---------------------------- BEGIN MODULE SCOPE VARIABLES ----------------------------
'use strict';
var 
	configRoutes,
	crud = require('./crud'),
	chat = require('./chat'),
	makeMongoId = crud.makeMongoId,

	agent_text = 'Enter the modern single page web application (SPA). '
		+ 'With the near universal availability of capable browsers and '
		+ 'powerful hardware, we can push most of the web application to '
		+ 'the browser; including HTML rendering, data and business '
		+ 'logic. The only time a client needs to communicate with the '
		+ 'server is to authenticate or synchronize data. This means users '
		+ 'get a fluid, comfortable experience whether they\'re surfing '
		+ 'at their desk or using a phone app on a sketch 3G connection.'
		+ '<br><br>'
		+ '<a href="/index.html#page=home">Home</a><br>'
		+ '<a href="/index.html#page=about">About</a><br>'
		+ '<a href="/index.html#page=buynow">Buy Now!</a><br>'
		+ '<a href="/index.html#page=contact us">Contact Us</a><br>';

//---------------------------- END MODULE SCOPE VARIABLES ----------------------------

//---------------------------- BEGIN PUBLIC METHODS ----------------------------
configRoutes = function(app, server) {
	app.all('*', function(req, res, next) {
		if (req.headers['user-agent'] ===
			'Googlebot/2.1 (+http://www.googlebot.com/bot.html)') {
			res.contentType('html');
			res.end(agent_text);
		} else {
			next();
		}
	});

	app.get('/', function(request, response) {
		response.redirect('/spa.html');
		response.header("Cache-Control", "max-age=28800");
	});

	app.all('/:obj_type/*?', function(request, response, next) {
		response.contentType('json');
		next();
	});

	app.get('/:obj_type/list', function(request, response) {
		crud.read(
			request.params.obj_type,
			{}, {},
			function(map_list) { response.send(map_list); }
		);
	});

	app.post('/:obj_type/create', function(request, response) {
		crud.construct(
			request.params.obj_type,
			request.body,
			function(result_map) { response.send(result_map); }
		);
	});

	app.get('/:obj_type/read/:id', function(request, response) {
		crud.read(
			request.params.obj_type,
			{ _id: makeMongoId(request.params.id) },
			{},
			function(map_list) { response.send(map_list); }
		);
	});

	app.post('/:obj_type/update/:id', function(request, response) {
		crud.update(
			request.params.obj_type,
			{ _id: makeMongoId(request.params.id) },
			request.body,
			function(result_map) { response.send(result_map); }
		);
	});

	app.get('/:obj_type/delete/:id', function(request, response) {
		crud.destroy(
			request.params.obj_type,
			{ _id: makeMongoId(request.params.id) },
			function(result_map) { response.send(result_map); }
		);
	});

	chat.connect(server);
};
module.exports = { configRoutes: configRoutes };
//---------------------------- END PUBLIC METHODS ----------------------------