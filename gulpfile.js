'use strict';

var gulp = require('gulp');
var war = require('gulp-war');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('browserify', function() {
  return browserify('app/index.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build/app/'));
});

gulp.task('browserify-min', function() {
  return browserify('app/index.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('build/app/'));
});

gulp.task('html-serve', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/app'));
});

gulp.task('css-serve', function() {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('build/app'));
});

gulp.task('assets-serve', function() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('build/assets'));
});

gulp.task('watch', ['browserify'], function() {
  gulp.watch('app/**/*.js', ['browserify']);
});

gulp.task('build', ['html-serve','assets-serve','css-serve','browserify'], function() {
});

gulp.task('serve', ['build','watch'], function() {
});

gulp.task('war', ['browserify', 'html'], function() {
  return gulp.src('dist/build/**')
    .pipe(war({
      welcome: 'index.html',
      displayName: 'Bet on me'
    }))
    .pipe(zip('betonme.war'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-war', ['war']);