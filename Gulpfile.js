var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    connect      = require('gulp-connect'),
    concat       = require('gulp-concat'),
    fileinclude  = require('gulp-file-include'),
    imagemin     = require('gulp-imagemin');

gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('arsenal.min.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload());
});

gulp.task('styles', function(){
    gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'condensed'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('fileinclude', function() {
  gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});



gulp.task('connect', function() {
    connect.server({ root: 'build', livereload: true });
});

gulp.task('images', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('build/img/'));
});

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch(['src/*.html', 'src/inc/**/*.html'], ['fileinclude']);
    gulp.watch(['src/img/*'], ['images']);
});

gulp.task('default', ['fileinclude','scripts', 'styles', 'images', 'watch', 'connect']);
gulp.task('build', ['fileinclude','scripts', 'styles', 'images']);

module.exports = gulp;
