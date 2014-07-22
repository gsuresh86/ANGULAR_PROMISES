var gulp = require("gulp"),
	connect = require("gulp-connect");

var htmlSrc = ["index.html", "partials/main.html"],
	cssSrc = ["css/style.css"],
	jsSrc = ["js/appMain.js"];

gulp.task("html", function(){
	gulp.src(htmlSrc)
		.pipe(connect.reload());
});

gulp.task("css", function(){
	gulp.src(cssSrc)
		.pipe(connect.reload());
});

gulp.task("js", function(){
	gulp.src(jsSrc)
		.pipe(connect.reload());
});

gulp.task("watch", function(){
	gulp.watch(htmlSrc, ["html"]);
	gulp.watch(cssSrc, ["css"]);
	gulp.watch(jsSrc, ["js"]);
});

gulp.task("connect", function(){
	connect.server({
		livereload: true
	});
});

gulp.task("default", ["watch", "connect"]);