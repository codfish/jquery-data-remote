const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const rimraf = require('rimraf');
const server = require('gulp-server-livereload');
const fs = require('fs');
require('shelljs/global');

const config = {
  src: './src',
  dist: './dist',
  demo: './demo',
  filename: 'jquery.data-remote.js',
};

/**
 * Clean start. Remove all dist files.
 *
 * @see https://www.npmjs.com/package/rimraf
 */
gulp.task('clean', () => {
  rimraf(config.dist, (err) => {
    if (err) throw err;
  });
});

/**
 * Transpile es6 to es5 using babel
 *
 * @see https://babeljs.io/docs/usage/options/
 */
gulp.task('babel', ['clean'], () =>
  gulp
    .src(`${config.src}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        blacklist: ['useStrict'],
      }),
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist)),
);

/**
 * Uglify
 *
 * @see https://www.npmjs.com/package/gulp-uglify#options
 */
gulp.task('uglify', ['babel'], () =>
  gulp
    .src(`${config.dist}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist)),
);

gulp.task('demo', ['uglify'], () => {
  const distFile = `${config.dist}/${config.filename}`;
  const demoFile = `${config.demo}/${config.filename}`;

  // copy over latest compiled version of the plugin
  // to the demo directory
  fs.stat(demoFile, (err) => {
    // delete existing file from demo dir if it exists
    if (!err) {
      fs.unlinkSync(demoFile);
    }

    // copy over last dist copy
    cp(distFile, demoFile);

    // start the server with demo being the webroot
    gulp.src(config.demo).pipe(
      server({
        port: 8080,
        open: true,
      }),
    );
  });
});

gulp.task('serve', ['demo']);
gulp.task('build', ['uglify']);
gulp.task('default', ['build']);
