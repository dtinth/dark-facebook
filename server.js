#!/usr/bin/env node

var fs = require('fs');
var options = {
	postprocess: function(css, callback) {
		callback(null, '/* generated: ' + new Date().toString() + ' */' + css);
	},
	stylus: function(o, stylus) {
		return o.define('url', stylus.url());
	}
};

var main = 'src/main.styl';

if (process.argv[2] == 'compile') {

	var oos = options.stylus;
	var oop = options.postprocess;
	options.stylus = function(o, stylus) {
		return oos(o, stylus).set('compress', true);
	};
	require('livestyl').compile(main, options, function(err, results) {
		if (err) throw err;
		console.log(fs.readFileSync(main, 'utf-8').match(/\/\*[\s\S]*?\*\//)[0]);
		console.log('/* this is compiled source code, for original source code see src/main.styl */');
		console.log(results);
	});

} else {

	var server = require('livestyl').createServer(main, options);
	var port = process.argv[2] || process.env.LIVESTYL_PORT;
	if (port == null || isNaN(port)) port = 25531;

	server.listen(port);
	console.log('navigate to http://localhost:' + port + '/ <-- mac user: cmd+double click!');

}
