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

	server.use('/updatestyle', function(req, res, next) {
		res.setHeader('Content-Type', 'text/javascript');
		function c() {}
		c.prototype = options;
		var opts = new c();
		opts.stylus = function(o, stylus) {
			return options.stylus(o, stylus).set('compress', true);
		};
		var css = '';
		var changelog = '';
		require('livestyl').compile(main, opts, function(err, results) {
			if (err) throw err;
			css += (fs.readFileSync(main, 'utf-8').match(/\/\*[\s\S]*?\*\//)[0] + '\n');
			css += ('/* this is compiled source code, for original source code see src/main.styl */\n');
			css += results;
			css = '@namespace url(http://www.w3.org/1999/xhtml);\n' +
				'@-moz-document domain("facebook.com") {\n\n' + css + '\n}\n';
			require('child_process').exec("git log --pretty=format:'* %ad %h %s' --date=iso", function(err, stdout, stderr) {
				changelog += stdout;
				changelog = '\r\n\r\nChangelog:\r\n' + changelog.split(/\r?\n/).filter(function(x) { return x.match(/^.*?\.styl:/); }).map(function(x) { return x.replace(/\S+\.styl/, ''); }).join('\r\n') + '\r\n';
				res.end('(' + function(css, changelog) {
					var changelog_re = /(?:\r?\n)*Changelog:?\r?\n\*[\s\S]*$|$/;
					document.getElementById('css').value = css;
					document.getElementById('style_additional_info').value =
						document.getElementById('style_additional_info').value.replace(changelog_re, function() {
							return changelog;
						});
				} + ')(\n' + JSON.stringify(css) + ',\n' + JSON.stringify(changelog) + ');');
			});
		});
	});

	server.listen(port);
	console.log('navigate to http://localhost:' + port + '/ <-- mac user: cmd+double click!');

}
