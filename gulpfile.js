var watchify = require('watchify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    gls = require('gulp-live-server'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    obfuscate = require('gulp-obfuscate'),
    minifyCss = require('gulp-minify-css'),
    rjs = require('gulp-requirejs-optimize'),
    clean = require('gulp-clean'),
    babelCore = require('babel-core'),
    babel = require('gulp-babel');

gulp.task('server', function() {
    var options = {
        cwd: undefined
    };
    options.env = process.env;
    var server = gls('bin/www', options, 35729);
    server.start();

    gulp.watch([
        'config*.js',
        'server/bin/*',
        'server/**/*.js*'
    ], function() {
        server.start();
    });
    gulp.watch([
        'client/assets/**/*.css',
        'client/assets/**/*.js',
        'server/views/**/*.hbs'
    ], function() {
        server.notify.apply(server, arguments);
    });
});

gulp.task('styles-prod', ['cleanStyles'], function() {
    return gulp.src(['client/less/**/*.less'])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
})

gulp.task('styles-dev', ['cleanStyles'], function() {
    return gulp.src(['client/less/**/*.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css/'));
})

gulp.task('cleanScripts', function() {
    return gulp.src(['dist/scripts/', '.temp/', 'dev/scripts/'])
        .pipe(clean());
})

gulp.task('cleanStyles', function() {
    return gulp.src(['dist/css/', 'dev/css/'])
        .pipe(clean());
})

gulp.task('scripts-prod', ['cleanScripts'], function() {
    return gulp.src(['client/assets/js/main.js'])
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(rjs({
            optimize: "uglify2",
            mainConfigFile: "client/assets/js/main.js",
            onBuildRead: function(moduleName, path, contents) {
                return babelCore.transform(contents, { presets: ['es2015'] }).code;
            }
        }))
        .pipe(gulp.dest('dist/scripts/'));
})

gulp.task('scripts-dev', ['cleanScripts'], function() {
    return gulp.src(['client/assets/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(rjs({
            optimize: "uglify2",
            mainConfigFile: "client/assets/js/main.js",
            onBuildRead: function(moduleName, path, contents) {
                return babelCore.transform(contents, { presets: ['es2015'] }).code;
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/scripts/'));
})

gulp.task('dev', ['server', 'styles-dev', 'scripts-dev'], function() {
    gulp.watch('client/less/**/*.less', ['styles-dev']);
    gulp.watch('client/assets/js/**/*.js', ['scripts-dev']);
});

gulp.task('prod', ['styles-prod', 'scripts-prod'], function() {});

gulp.task('default', ['prod'], function() {});
