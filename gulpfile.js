var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('sass', function() {
  return gulp.src(['node_modules/normalize.css/normalize.css', 'scss/*.scss'])
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'start', 'watch']);
gulp.task('build', ['sass']);
