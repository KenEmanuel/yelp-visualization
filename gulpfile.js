var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var bs = require('browser-sync').create();

gulp.task('nodemon', function() {
    nodemon({
        script: 'server.js',
        ext: 'js less html'
    })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('Restarted!');
        });
});

gulp.task('test', function() {
    return gulp.src(['test/*.js'])
        .pipe(mocha({reporter: 'list'}));
});

gulp.task('watch', function() {
    gulp.watch([ 'server.js', 'app.js' ], []);
});

gulp.task('default', ['nodemon']);