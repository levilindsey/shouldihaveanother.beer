var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', () => {
  plugins.connect.server({
    root: "./app",
    livereload: true,
    host: 'localhost',
    port: '3000',
    fallback: './app/index.html',
  })
});
