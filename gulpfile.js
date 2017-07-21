var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('bundle', function() {
    return browserify('src/App.js')
        .transform('babelify', {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {

    var b = browserify({
        entries: ['src/App.js'],
        cache: {}, packageCache: {},
        plugin: ['watchify']
    });

    b.on('update', makeBundle);

    function makeBundle() {
        b.transform('babelify', {presets: ["es2015", "react"]})
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('public/'));
    }

    // we have to call bundle once to kick it off.
    makeBundle();

    return b;
});