var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync').create();

gulp.task('nodemon', function() {
    bs.init({
        proxy: 'localhost:3000'
    });
    nodemon({
        script: 'server.js',
        ext: 'js html'
    })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('server restarted')
        })
});

gulp.task('watch', function() {
    gulp.watch([ 'server.js', 'app.js' ], []);
});

gulp.task('default', ['nodemon']);