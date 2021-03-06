var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy: false});
var config = require('./config');

gulp.task('server', function () {
  plugins.connect.server({
    root: [config.distPath],
    host: config.host,
    port: config.port,
    livereload: true
  })
});
