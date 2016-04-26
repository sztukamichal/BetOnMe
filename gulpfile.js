'use strict';

var gulp = require('gulp');
var war = require('gulp-war');
var zip = require('gulp-zip');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  return browserify('app/index.js').bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/build/app'))
    .pipe(gulp.dest('app/'));
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist/build/app'));
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

gulp.task('build', ['war']);