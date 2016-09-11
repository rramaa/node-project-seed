var watchify = require('watchify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    rjs = require('gulp-requirejs-optimize'),
    clean = require('gulp-clean'),
    babelCore = require('babel-core'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    babel = require('gulp-babel');

gulp.task('server', function() {
    nodemon({
        script: path.join(__dirname, "bin", "www"),
        watch: ["server/**/*.js", "server/*.js"]
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css/'));
})

gulp.task('client:cleanScripts', function() {
    return gulp.src(['dist/scripts/', '.temp/', 'dev/scripts/'])
        .pipe(clean());
})

gulp.task('server:cleanScripts', function() {
    return gulp.src(['compiled/'])
        .pipe(clean());
})

gulp.task('cleanStyles', function() {
    return gulp.src(['dist/css/', 'dev/css/'])
        .pipe(clean());
})

gulp.task('client:scripts-prod', ['client:cleanScripts'], function() {
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

gulp.task('server:scripts-prod', ['server:cleanScripts'], function() {
    return gulp.src(['server/**/*.js', 'server/*.js'])
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('compiled/'));
})

gulp.task('client:scripts-dev', ['client:cleanScripts'], function() {
    return gulp.src(['client/assets/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/scripts/'));
})

gulp.task('dev', ['server', 'styles-dev', 'client:scripts-dev'], function() {
    gulp.watch('client/less/**/*.less', ['styles-dev']);
    gulp.watch('client/assets/js/**/*.js', ['client:scripts-dev']);
});

gulp.task('scripts-prod', ['client:scripts-prod', 'server:scripts-prod'], function(){

})

gulp.task('prod', ['styles-prod', 'scripts-prod'], function() {});

gulp.task('default', ['prod'], function() {});
