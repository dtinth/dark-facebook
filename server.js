#!/usr/bin/env node

var options = {
	postprocess: function(css, callback) {
		callback(null, '/* generated: ' + new Date().toString() + ' */' + css);
	},
	stylus: function(o, stylus) {
		return o.define('url', stylus.url());
	}
};

var main = 'main.styl';

if (process.argv[2] == 'compile') {

	require('livestyl').compile(main, options, function(err, results) {
		if (err) throw err;
		console.log(results);
	});

} else {

	var server = require('livestyl').createServer(main, options);
	var port = process.argv[2] || process.env.LIVESTYL_PORT;
	if (port == null || isNaN(port)) port = 25531;

	server.listen(port);
	console.log('navigate to http://localhost:' + port + '/ <-- mac user: cmd+double click!');

}
