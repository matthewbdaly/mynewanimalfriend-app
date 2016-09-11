var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

var paths = {
  scripts: ['js/*.js'],
  styles: ['sass/*.scss']
};

gulp.task('sass', function() {
  gulp.src('sass/style.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('www/css'));
});;

gulp.task('js', function () {
  return browserify({ entries: ['js/main.js'], debug: true })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('www/js/'));
});

gulp.task('server', function () {
  gulp.src('www/')
    .pipe(server({
      livereload: true,
      open: true,
      port: 5000
    }));
});


gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['sass','js','server', 'watch']);
