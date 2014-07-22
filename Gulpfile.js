var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    connect      = require('gulp-connect'),
    imagemin     = require('gulp-imagemin');

gulp.task('scripts', function(){
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload());
});

gulp.task('styles', function(){
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'compressed', sourcemap: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch(['index.html'], ['html']);
});

gulp.task('connect', function() {
    connect.server({ root: 'build', livereload: true });
});

gulp.task('images', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('build/img/'));
});

gulp.task('default', ['html','scripts', 'styles', 'images', 'watch', 'connect']);
