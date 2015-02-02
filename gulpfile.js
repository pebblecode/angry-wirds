"use strict";

// Plugins
var            gulp = require( 'gulp' ),
            connect = require( 'connect' ),
  connectLivereload = require( 'connect-livereload' ),
     gulpLivereload = require( 'gulp-livereload' ),
               sass = require( 'gulp-sass' ),
             prefix = require( 'gulp-autoprefixer' ),
             jshint = require( "gulp-jshint" ),
            stylish = require( 'jshint-stylish' ),
            include = require( 'gulp-file-include' );

// paths & files
var src = {
     html: [ 'src/**/*.html', '!src/templates/**/*.html' ],
templates: 'src/templates/**/*.html',
     sass: 'src/sass/**/*.scss',
       js: 'src/js/**/*.js',
      img: 'src/img/**/*'
};

var dist = {
  dist: 'dist/',
  html: 'dist/**/*.html',
  css: 'dist/css/',
  js: 'dist/js/',
  img: 'dist/img'
}

// ports
var localPort =  4000,
       lrPort = 35729;

// start local server
gulp.task( 'server', function() {
  var server = connect();

  server.use( connectLivereload( { port: lrPort } ) );
  server.use( connect.static( dist.dist ) );
  server.listen( localPort );

  console.log( "\nlocal server running at http://localhost:" + localPort + "/\n" );
});

// jshint
gulp.task( 'jshint', function() {
  gulp.src( [ src.js, '!src/js/vendor/**/*.js' ] )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) );
});

// compile sass
gulp.task( 'sass', function() {
  gulp.src( src.sass )
    .pipe( sass({
      outputStyle: [ 'expanded' ],
      sourceComments: 'normal',
      errLogToConsole: true
    }))
    .pipe( prefix() )
    .pipe( gulp.dest( dist.css ) );
});

// copy images
gulp.task( 'copyImg', function() {
  gulp.src( src.img )
    .pipe( gulp.dest( dist.img ) );
});

// copy javascript
gulp.task( 'copyJs', function() {
  gulp.src( src.js )
    .pipe( gulp.dest( dist.js ) );
});

// compile sass
gulp.task( 'incTemplate', function() {
  gulp.src( src.html )
    .pipe( include() )
    .pipe( gulp.dest( dist.dist ) );
});

// watch file
gulp.task( 'watch', function(done) {
  var lrServer = gulpLivereload();

  gulp.watch( [ dist.html, dist.js, dist.css + '*' ] )
    .on( 'change', function( file ) {
      lrServer.changed( file.path );
    });

  gulp.watch( src.js, [ 'jshint', 'copyJs' ] );

  gulp.watch( src.sass, [ 'sass' ] );

  gulp.watch( src.img, [ 'copyImg' ] );

  gulp.watch( [ src.html, src.templates ] , [ 'incTemplate' ] );
});

// build all assets
gulp.task( 'build', [ 'sass', 'incTemplate', 'copyJs', 'copyImg' ] );

// default task
gulp.task( 'default', [ 'server', 'watch' ] );
