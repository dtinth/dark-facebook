
// userstyles-credentials.json: { "username": ".....", "password": "....." }
// userstyles-config.json: { "styleID": "56731", "filename": "dark-facebook.css" }

var fs = require('fs');
try {
	var credentials = JSON.parse(fs.read('userstyles-credentials.json'));
	var config      = JSON.parse(fs.read('userstyles-config.json'));
	var css = fs.read(config.filename);
	var changelog;
	try {
		changelog = fs.read(config.changelog);
	} catch (e) {
		changelog = '(no changelog available)';
	}
} catch (e) {
	console.log('configuration read error: ' + e);
	phantom.exit(1);
}

css = '@namespace url(http://www.w3.org/1999/xhtml);\n' +
	'@-moz-document domain("facebook.com") {\n\n' + css + '\n}\n';

changelog = '\r\n\r\nChangelog:\r\n' + changelog.split(/\r?\n/).filter(function(x) { return x.match(/^.*?\.styl:/); }).map(function(x) { return x.replace(/\S+\.styl/, ''); }).join('\r\n') + '\r\n';
var editLink = 'http://userstyles.org/styles/' + config.styleID + '/edit';
var page = new WebPage();

function setGlobal(page, name, data) {
	var json = JSON.stringify(data);
	var fn = 'return window[' + JSON.stringify(name) + ']=' + json + ';';
	return page.evaluate(new Function(fn));
};

page.onLoadFinished = processPage;
page.open(editLink);
page.onConsoleMessage = function (msg) { console.log('page : ' + msg); };

var processState = 0;

function processPage(status) {
	setGlobal(page, '__dt_credentials', credentials);
	setGlobal(page, '__dt_state', processState);
	setGlobal(page, '__dt_css', css);
	setGlobal(page, '__dt_changelog', changelog);
	console.log(page.evaluate(function() { return location.href + ' // ' + document.title; }));
	var retval = page.evaluate(function() {
		var changelog_re = /(?:\r?\n)*Changelog:?\r?\n\*[\s\S]*$|$/;
		try {
			var un, pw, el, cl;
			if ((__dt_state != 1) && (un = document.querySelector('#login-existing')) && (pw = document.querySelector('#password-existing'))) {
				un.value = __dt_credentials.username;
				pw.value = __dt_credentials.password;
				pw.form.submit();
				console.log('form submitted');
				return 1;
			}
			if ((__dt_state != 2) && (el = document.querySelector('textarea[name="style[css]"]#css'))) {
				el.value = __dt_css;
				if ((cl = document.querySelector('#style_additional_info'))) {
					cl.value = cl.value.replace(changelog_re, function() { return __dt_changelog; });
					console.log('additional info\n---------------------------------\n' + cl.value);
				}
				if (el.value && el.value != 'undefined' && el.value != 'null') {
					console.log('css submitted');
					el.form.submit();
				} else {
					console.log('can\'t set css!');
					return -1;
				}
				return 2;
			}
			if (location.pathname.match(/^\/styles\/\d+\/.*/) && ~location.search.indexOf('r=')) {
				console.log('finished');
				return -1;
			}
		} catch (e) {
			console.log('error : ' + e);
			return -1;
		}
		return __dt_state;
	});
	if (retval == -1) {
		phantom.exit();
	} else {
		processState = retval;
	}
}
