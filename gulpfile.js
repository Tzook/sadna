'use strict';
let gulp 		= require('gulp'),
    spawn       = require('child_process').spawn,
	server 		= require('gulp-develop-server');

// Server start
gulp.task("server:start", () => {
    let ts = spawn('npm', ['start']); // set the typescript compilation process going
	ts.stdout.on("data", data => {
		data = data.toString();
		console.log(data);
		if (data.indexOf("Compilation complete") !== -1) {
			startServerWhenReady(data);
		}
	});
});

let startServerWhenReady = data => {
	server.listen({path: './output/main/server-bootstrap.js'});
	startServerWhenReady = () => {
		server.restart();
	};
};

// Server kill
gulp.task("server:restart", () => {
	server.restart();
});

// WATCH
// =====
gulp.task("default", ["server:start"], () => {
	// gulp.watch(["output/**/*.*"], ["server:restart"]);
});