var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence')

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('build', [
    'fonts',
    'images',
    'scripts',
    'templates',
    'styles'
]);

gulp.task('images', function() {
  gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('templates', function() {
  gulp.src('./src/templates/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('connect', function() {
  connect.server({
    root: './build'
  });
});

gulp.task('scripts', function () {
  gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('styles', function () {
  gulp.src('./src/styles/style.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 20 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/styles/*.less','./src/styles/global/*.less', './src/styles/blocks/*.less'], ['styles']);
    gulp.watch('./src/templates/*.html', ['templates']);
    gulp.watch('./src/scripts/*.js', ['scripts']);
});

gulp.task('dev', ['connect', 'build', 'watch']);