var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var server = require('gulp-server-livereload');
var fs = require('fs');

var config = {
  src: './src',
  dist: './dist',
  demo: './demo',
  filename: 'jquery.data-remote.js'
}

function copy(from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

/**
 * Clean start. Remove all build files.
 *
 * @see https://www.npmjs.com/package/rimraf
 */
gulp.task('clean', function () {
  rimraf(config.dist, function(err) {
    if (err) throw err;
  });
});

/**
 * Transpile es6 to es5 using babel
 *
 * @see https://babeljs.io/docs/usage/options/
 */
gulp.task('babel', ['clean'], function () {
  return gulp.src(config.src + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
});

/**
 * Uglify
 *
 * @see https://www.npmjs.com/package/gulp-uglify#options
 */
gulp.task('uglify', ['clean', 'babel'], function () {
  return gulp.src(config.dist + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
});

gulp.task('demo', function() {
  copy(config.dist + '/' + config.filename, config.demo + '/' + config.filename);

  gulp.src(config.demo)
    .pipe(server({
      port: 8080,
      open: true
    }));
});
gulp.task('serve', ['demo']);

// Main tasks
gulp.task('build', ['babel', 'uglify']);
gulp.task('default', ['build']);
