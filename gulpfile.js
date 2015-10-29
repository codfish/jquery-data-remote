var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var server = require('gulp-server-livereload');
var zip = require('gulp-zip');
var fs = require('fs');
require('shelljs/global');

var config = {
  src: './src',
  dist: './dist',
  build: './build',
  demo: './demo',
  filename: 'jquery.data-remote.js'
}

/**
 * Clean start. Remove all build files.
 *
 * @see https://www.npmjs.com/package/rimraf
 */
gulp.task('clean', function () {
  rimraf(config.dist, function (err) {
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
gulp.task('uglify', ['babel'], function () {
  return gulp.src(config.dist + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist));
});

gulp.task('demo', ['babel'], function() {
  var distFile = config.dist  + '/' + config.filename;
  var demoFile = config.demo  + '/' + config.filename;

  // copy over latest compiled version of the plugin
  // to the demo directory
  fs.stat(demoFile, function (err, stats) {
    // delete existing file from demo dir if it exists
    if (!err) {
      fs.unlinkSync(demoFile);
    }

    // copy over last dist copy
    cp(distFile, demoFile);

    // start the server with demo being the webroot
    gulp.src(config.demo)
      .pipe(server({
        port: 8080,
        open: true
      }));
  });
});

/**
 * Build Release
 *
 * @see https://www.npmjs.com/package/gulp-zip
 */
gulp.task('release', function () {
  gulp.src([
      '!node_modules',
      '!node_modules/**/*',
      '!build',
      '!build/**/*',
      '**/*',
    ])
    .pipe(zip(config.filename.replace('.js', '.zip')))
    .pipe(gulp.dest(config.build));
});

gulp.task('serve', ['demo']);
gulp.task('build', ['release']);
gulp.task('default', ['build']);
