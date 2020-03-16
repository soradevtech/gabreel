const gulp = require('gulp')
const sass = require('gulp-sass')
// Adds support for different browsers with prefixes on certain properties
const autoprefixer = require('gulp-autoprefixer')
// const concat = require('gulp-concat')
// const babel = require('gulp-babel')
// const watch = require('gulp-watch')
// Syncs the browser when source files are updated
const browserSync = require('browser-sync')
// Reload function for browserSync
const reload = browserSync.reload
var exec = require('child_process').exec;

// Default behavior of gulp, starting the CSS preprocessor, webpack, and browser-sync
// Called in the CLI with 'gulp'. Watches files for changes in order to run the 
// appropriate task.
gulp.task('default', ['styles', 'webpack', 'browser-sync'], () => {
  gulp.watch('./resources/assets/sass/**/*', ['styles'])
  gulp.watch('./resources/assets/js/**/*', ['webpack'])
  // All of the folders
  gulp.watch(['./public/**/*', './public/*', '!public/js/**/.#*js', '!public/css/**/.#*css', './resources/views/*','./resources/views/**/*']).on('change', reload)
})

// CSS preprocessing tasks
gulp.task('styles', () => {
  gulp.src('./resources/assets/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

// Settings for browser-sync any time it's called.
// Also a local server for the front end(?). 
// The back end is served by the AdonisJS server.
gulp.task('browser-sync', ['styles'], function () {
  // THIS IS FOR SITUATIONS WHEN YOU HAVE ANOTHER SERVER RUNNING
  browserSync.init({
    proxy: {
      target: 'localhost:3000', // can be [virtual host, sub-directory, localhost with port]
      ws: true // enables websockets
    },
    notify: false,
    open: false,
    serveStatic: ['.', './public']
  })

  // browserSync.init({
  //       server: './public',
  //       notify: false,
  //       open: false //change this to true if you want the browser to open automatically 
  //   });
})

gulp.task('webpack', (cb) => {
  exec('webpack', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
})

// gulp.task('webpack', shell.task([
//   'webpack'
// ]))

// gulp.task('server', shell.task([
//   'yarn run server'
// ]))
