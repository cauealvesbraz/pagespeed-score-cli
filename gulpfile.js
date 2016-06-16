'use strict';

var gulp = require('gulp');
var xo = require('gulp-xo');
var ava = require('gulp-ava');

gulp.task('xo', function () {
  return gulp.src('*.js')
              .pipe(xo());
});

gulp.task('ava', ['xo'], function () {
  return gulp.src('test.js')
              .pipe(ava());
});

gulp.task('test', ['ava']);
