
var Canvas = require('canvas');
var Chain = require('./chained-action');
var fs = require('fs');
var spawn = require('child_process').spawn;

function log() {
	var x = Array.prototype.slice.call(arguments);
	for (var i = 0; i < log.depth; i ++) x.unshift(i == 0 ? '|-' : '| ');
	console.log.apply(console, x);
}
log.depth = 0;

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

var fx = new Chain({
	fetch: function(src) {
		return this.chain(function(dest, next) {
			var loaded = false;
			try {
				if (fs.statSync(dest)) {
					log('image already loaded');
					loaded = true;
				}
			} catch (e) {
			}
			if (loaded) {
				return next(dest);
			}
			log('has to load image');
			runCommand('curl', ['-s', src, '-o' + dest], function(code) {
				if (code == 0) {
					next(dest);
				} else {
					throw new Error('failed to download image! code ' + code);
				}
			});
		});
	},
	load: function(filename) {
		return this.runTask(filename).chain(function(dest, next) {
			this.source.run(dest, function() {
				log('loading image: ' + filename);
				var image = new Canvas.Image()
				image.src = fs.readFileSync(filename);
				var canvas = new Canvas(image.width, image.height);
				var ctx = canvas.getContext('2d');
				ctx.drawImage(image, 0, 0);
				next(canvas);
			});
		});
	},
	create: function(width, height) {
		return this.chain(function(dest, next) {
			next(new Canvas(width, height));
		});
	},
	canvas: function(canvas) {
		return this.chain(function(dest, next) {
			next(canvas);
		});
	},
	save: function() {
		return this.chain(function(dest, next) {
			this.source.run(dest, function(canvas) {
				log('saving image to: ' + dest);
				fs.writeFileSync(dest, canvas.toBuffer());
				next(dest);
			});
		});
	},
	compress: function() {
		return this.chain(function(dest, next) {
			if (process.env.COMPRESS_PNG != '1') {
				return this.source.run(dest, function(filename) {
					log('compression disabled, export COMPRESS_PNG=1 to enable');
					next(filename);
				});
			}
			var tempnam = 'TMP-' + dest;
			this.source.run(tempnam, function(outnam) {
				if (typeof outnam != 'string') {
					throw new Error('invalid output format. forgot to call save()?');
				}
				runCommand('pngout', [outnam, dest, '-y'], function(code) {
					try {
						if (code != 0) throw new Error('pngout returned ' + code);
						fs.statSync(dest);
						fs.unlinkSync(outnam);
					} catch (e) {
						log('!!! cannot compress png: ' + e);
						log('    leaving as is');
						fs.renameSync(outnam, dest);
					}
					next();
				});
			});
		});
	},
	pixelManipulate: function(desc, callback) {
		return this.chain(function(dest, next) {
			this.source.run(dest, function(canvas) {
				log('pixel manipulation: ' + desc);
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
			});
		});
	},
	crop: function(x1, y1, x2, y2, mode) {
		if (!mode) mode = 'in';
		return this.pixelManipulate('crop: (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + ')', function(pixel, x, y) {
			if ((mode == 'in') ^ ((x1 <= x && x < x2) && (y1 <= y && y < y2))) {
				pixel[0] = 0;
				pixel[1] = 0;
				pixel[2] = 0;
				pixel[3] = 0;
			}
		});
	},
	colorize: function(o) {
		function parse(c) {
			return [parseInt(c.substr(0, 2), 16), parseInt(c.substr(2, 2), 16), parseInt(c.substr(4, 2), 16)];
		}
		function value(c) {
			return Math.min(1, Math.max(0, (c[0] + c[1] + c[2]) / 3 / 255));
		}
		var l = [], len = 0;
		for (var s in o) {
			l[len++] = { source: value(parse(s)), dest: parse(o[s]) };
		}
		l.sort(function(a, b) {
			return a.source - b.source;
		});
		function set(p, c) {
			p[0] = c[0]; p[1] = c[1]; p[2] = c[2];
		}
		return this.pixelManipulate('colorize', function(pixel) {
			var v = value(pixel);
			if (v < l[0].source) return set(pixel, l[0].dest);
			if (l[len - 1].source <= v) return set(pixel, l[len - 1].dest);
			for (var i = 0; i < len - 1; i ++) {
				if (l[i].source <= v && v < l[i + 1].source) {
					var vv = (v - l[i].source) / (l[i + 1].source - l[i].source);
					for (var j = 0; j < 3; j ++) {
						pixel[j] = l[i].dest[j] * (1 - vv) + l[i + 1].dest[j] * vv;
					}
				}
			}
		});
	},
	darken: function(rx, gx, bx) {
		return this.grayscale().invert();
	},
	grayscale: function() {
		return this.pixelManipulate('grayscale', function(pixel) {
			var value = (pixel[0] + pixel[1] + pixel[2]) / 3;
			pixel[0] = pixel[1] = pixel[2] = value;
		});
	},
	invert: function() {
		return this.pixelManipulate('invert', function(pixel) {
			pixel[0] = 255 - pixel[0];
			pixel[1] = 255 - pixel[1];
			pixel[2] = 255 - pixel[2];
		});
	},
	curve: function(rx, gx, bx) {
		return this.pixelManipulate('curve: ' + rx + ', ' + gx + ', ' + bx, function(pixel) {
			pixel[0] = Math.pow(pixel[0] / 255, rx) * 255;
			pixel[1] = Math.pow(pixel[1] / 255, gx) * 255;
			pixel[2] = Math.pow(pixel[2] / 255, bx) * 255;
		});
	},
	runTask: function(taskName) {
		return this.chain(function(dest, callback) {
			if (tasksTrack[taskName]) { // already run
				return callback.apply(null, tasksTrack[taskName].result);
			}
			var task = tasks[taskName];
			if (!task) {
				if (taskName == 'all') {
					task = fx;
					for (var k in tasks) {
						task = task.runTask(k);
					}
					if (task === fx) {
						log('!!! no tasks available');
						return;
					}
					task = task.chain(function(taskName, callback) {
						log('running all tasks');
						this.source.run(dest, callback);
					});
				} else {
					log('!!! invalid task: ' + taskName);
					return;
				}
			}
			function runThisTask() {
				log('running task: ' + taskName);
				log.depth ++;
				task.run(taskName, function() {
					tasksTrack[taskName] = { result: Array.prototype.slice.call(arguments) };
					log.depth --;
					callback.apply(null, arguments);
				});
			}
			if (this.source && this.source.run) {
				this.source.run(dest, runThisTask);
			} else {
				runThisTask();
			}
		});
	},
	require: function(taskName) {
		return this.runTask(taskName);
	},
	linearGradient: function(x1, y1, x2, y2, gtask) {
		return this.chain(function(dest, next) {
			this.source.run(dest, function(canvas) {
				log('drawing gradient (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + ')');
				var ctx = canvas.getContext('2d');
				var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
				ctx.save();
				gtask.run(gradient, function() {
					ctx.fillStyle = gradient;
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.restore();
					next(canvas);
				});
			});
		});
	},
	verticalGradient: function(gradient) {
		return this.chain(function(dest, next) {
			this.source.run(dest, function(canvas) {
				var lgtask = fx.canvas(canvas).linearGradient(0, 0, 0, canvas.height, gradient);
				lgtask.run(dest, next);
			});
		});
	}
});

fx.gradient = new Chain({
	add: function(pos, color) {
		return this.chain(function(gradient, callback) {
			function pass() {
				log('adding color stop at ' + pos + ', color = ' + color);
				gradient.addColorStop(pos, color);
				callback();
			}
			if (this.source.run) {
				this.source.run(gradient, pass);
			} else {
				pass();
			}
		});
	}
});


var tasksTrack = {};


var tasks = {
	"fb-sprite1.png":      fx.fetch("https://s-static.ak.facebook.com/rsrc.php/v1/yj/r/HqOfhywhWvc.png"),
	"fb-sprite2.png":      fx.fetch("https://s-static.ak.facebook.com/rsrc.php/v1/yH/r/ZIre3H19AvO.png"),
	"fb-timeline1.png":    fx.fetch("https://s-static.ak.facebook.com/rsrc.php/v1/yU/r/R8qnmwdGS8-.png"),
	"fb-timeline2.png":    fx.fetch("https://s-static.ak.facebook.com/rsrc.php/v1/yD/r/N8eF8pLkCCD.png"),
	"stream-button.png":   fx.load("fb-sprite1.png").darken().crop(0, 454, 64, 480).save().compress(),
	"timeline-sprite.png": fx.load("fb-timeline1.png").crop(111, 14, 294, 88).colorize({ 'FFFFFF': '353433', 'E8EAF1': '252423', '95A3C2': '8B8685' }).save().compress(),
	"timeline-bar.png":    fx.load("fb-timeline2.png").darken().save().compress(),
	"top-bar.png":         fx.create(1, 37).verticalGradient(fx.gradient.add(0, '#353433').add(1, '#090807')).save(),
	"jewel":               fx.load("fb-sprite2.png").crop(0, 0, 104, 277).crop(0, 138, 104, 245, 'out').crop(0, 0, 31, 138, 'out').crop(80, 0, 104, 138, 'out'),
	"jewel.png":           fx.require("jewel").colorize({ '000000': '8b8685', 'FFFFFF': '090807' }).save(),
	"jewel-normal.png":    fx.require("jewel").curve(1.2, 1.2, 1.2).colorize({ '000000': '090807', '8B8685': '8B8685', 'CCCCCC': 'e9e8e7' }).save()
};

function run() {
	var chain = fx;
	for (var i = 2; i < process.argv.length; i ++)
		chain = chain.runTask(process.argv[i]);
	if (chain === fx)
		chain = chain.runTask('all');
	chain.run('main', function() {
		log('all done!');
	});
}

run();

