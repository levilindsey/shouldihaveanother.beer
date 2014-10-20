var gulp = require('gulp');
var config = require('./config');

gulp.task('default', ['clean'], function () {
  gulp.start('scripts', 'styles', 'copy-index', 'copy-media', 'copy-device-icons', 'watch',
      'server');
});
