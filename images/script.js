
var Canvas = require('canvas');
var fs = require('fs');
var spawn = require('child_process').spawn;

function loadImageFile(file) {
	var image = new Canvas.Image()
	image.src = fs.readFileSync(file);
	var canvas = new Canvas(image.width, image.height);
	var ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	return canvas;
}

var alreadyRun = {};

function log() {
	var x = Array.prototype.slice.call(arguments);
	for (var i = 0; i < log.depth; i ++) x.unshift(i == 0 ? '|-' : '| ');
	console.log.apply(console, x);
}
log.depth = 0;

function runTask(taskName, next) {
	if (alreadyRun[taskName]) return next();
	alreadyRun[taskName] = true;
	var task = tasks[taskName];
	log('running: ' + taskName);
	log.depth++;
	function cont() {
		log.depth--;
		next();
	}
	if (!task) {
		if (taskName == 'all') {
			runAll(cont);
		} else {
			log('!!! error: task not found');
		}
	}
	if (typeof task == 'string') {
		loadImage(taskName, task, cont);
	} else if (typeof task == 'function') {
		task(taskName, cont);
	}
}

function runCommand(cmd, args, callback) {
	var proc = spawn(cmd, args);
	log('exec:', cmd, args.join(' '));
	proc.stdout.on('data', function(data) {
		process.stdout.write(data);
	});
	proc.stderr.on('data', function(data) {
		process.stderr.write(data);
	});
	proc.stdin.end();
	proc.on('exit', callback);
}

function loadImage(dest, src, next) {
	try {
		if (fs.statSync(dest)) {
			log('image already loaded');
			return next();
		}
	} catch (e) {
		log('has to load image');
	}
	runCommand('curl', ['-s', src, '-o' + dest], function(code) {
		if (code == 0) {
			next();
		} else {
			throw new Error('failed to download image! code ' + code);
		}
	});
}

function runAll(next) {
	var list = [];
	for (var i in tasks) {
		list.push(i);
	}
	runTaskList(list, next);
}

function runTaskList(list, next) {
	var i = 0;
	function loop() {
		if (i >= list.length) {
			log('all done');
			next();
			return;
		}
		runTask(list[i], cont);
	}
	function cont() {
		i++;
		loop();
	}
	loop();
}

function iop(src) {
	var list = [];
	var index = 0;
	function f(dest, next) {
		function pass(img) {
			if (index >= list.length) {
				fs.writeFileSync(dest, img.toBuffer());
				next();
				return;
			} else {
				list[index](img, function(img2) {
					index++;
					pass(img2);
				});
			}
		}
		if (typeof src == 'string') {
			runTask(src, function() {
				pass(loadImageFile(src));
			});
		} else {
			pass(src);
		}
	}
	f.chain = function(c) {
		list.push(c);
		return f;
	};
	for (var k in t) {
		(function(k) {
			f[k] = function() {
				return f.chain(t[k].apply(t, arguments));
			};
		})(k);
	}
	return f;
}

var t = {
	pixelManipulate: function(src, callback) {
		return function(canvas, next) {
			var ctx = canvas.getContext('2d');
			var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var l = data.data.length;
			var percent = 0, written = 0;
			var number = 0;
			process.stderr.write('\r');
			for (var i = 0; i < l; i += 4) {
				percent = (i / l) * 50;
				for (; written < percent; written++) process.stderr.write('*');
				var pixel = [data.data[i], data.data[i + 1], data.data[i + 2], data.data[i + 3]];
				callback(pixel, number % data.width, Math.floor(number / data.width));
				number++;
				data.data[i]     = pixel[0];
				data.data[i + 1] = pixel[1];
				data.data[i + 2] = pixel[2];
				data.data[i + 3] = pixel[3];
			}
			process.stderr.write('\r');
			for (; written >= 0; written --) process.stderr.write(' ');
			process.stderr.write('\r');
			ctx.putImageData(data, 0, 0);
			next(canvas);
		};
	},
	crop: function(src, x1, y1, x2, y2) {
		return t.pixelManipulate(src, function(pixel, x, y) {
			if (!((x1 <= x && x < x2) && (y1 <= y && y < y2))) {
				pixel[0] = 0;
				pixel[1] = 0;
				pixel[2] = 0;
				pixel[3] = 0;
			}
		});
	},
	darken: function(src, rx, gx, bx) {
		if (rx == null) rx = 1;
		if (gx == null) gx = 1;
		if (bx == null) bx = 1;
		return t.pixelManipulate(src, function(pixel) {
			var value = (pixel[0] + pixel[1] + pixel[2]) / 3 / 255;
			value = 1 - value;
			pixel[0] = Math.pow(value, rx) * 255;
			pixel[1] = Math.pow(value, gx) * 255;
			pixel[2] = Math.pow(value, bx) * 255;
		});
	},
	pngCompress: function(srcFunction) {
		return function(dest, next) {
			if (process.env.COMPRESS_PNG != '1') {
				srcFunction(dest, function() {
					log('compression disabled, export COMPRESS_PNG=1 to enable');
					next();
				});
				return;
			}
			var tempnam = 'TMP-' + dest;
			srcFunction(tempnam, function() {
				runCommand('pngout', [tempnam, dest, '-y'], function(code) {
					try {
						if (code != 0) throw new Error('pngout returned ' + code);
						fs.statSync(dest);
						fs.unlinkSync(tempnam);
					} catch (e) {
						log('!!! cannot compress png: ' + e);
						log('    leaving as is');
						fs.renameSync(tempnam, dest);
					}
					next();
				});
			});
		};
	}
};

var tasks = {
	"fb-sprite1.png": "https://s-static.ak.facebook.com/rsrc.php/v1/yj/r/HqOfhywhWvc.png",
	"stream-button.png": iop("fb-sprite1.png").darken().crop(0, 454, 64, 480)
};

function run() {
	var list = [];
	for (var i = 2; i < process.argv.length; i ++) {
		list.push(process.argv[i]);
	}
	if (list.length == 0) list.push('all');
	runTaskList(list, function() {
		log('finished');
	});
}

run();

/*
var cvs = loadImage(process.argv[2]);
darken(cvs);
fs.writeFileSync(process.argv[3], cvs.toBuffer());
*/

