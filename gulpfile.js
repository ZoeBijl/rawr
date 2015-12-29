var gulp = require('gulp');
var nano = require('gulp-cssnano');
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('app/css/core.css')
      .pipe(postcss([
        // import MUST be before custom-properties for variables to work
        require('postcss-import'),
        require('postcss-calc'),
        require('postcss-custom-media'),
        require('postcss-custom-properties'),
        require('postcss-custom-selectors'),
        // color-function MUST be after custom-selectors
        // for it to work with variables
        require('postcss-color-function'),
        require('postcss-media-minmax'),
        require('postcss-nesting'),
        require('postcss-nested'),
        require('postcss-extend'),
        require('autoprefixer')
      ]))
      .pipe(gulp.dest('build/css'))
      .pipe(connect.reload());
});

gulp.task('minify', function () {
  return gulp.src('build/css/core.css')
    .pipe(nano())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('sortedam'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('default', ['css', 'connect'], function () {
  gulp.watch('app/css/**/*.css', ['css']);
});
