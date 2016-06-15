'use strict';
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var ava = require('gulp-ava');
var babel = require('gulp-babel');
var files = ['*.js','src/*.js'];


gulp.task('transpile',['transpileTestFile'],function() {
  return gulp.src('src/*.js')
              .pipe(babel({
                presets: ['es2015']
              }))
              .pipe(gulp.dest('dist'));
});
gulp.task('transpileTestFile',function() {
  return gulp.src('test.js')
              .pipe(babel({
                presets: ['es2015']
              }))
              .pipe(gulp.dest('tests'));
});
gulp.task('jscs', ['transpile'],function() {
  return gulp.src(files)
              .pipe(jscs());
});

gulp.task('lint', ['jscs'],function() {
  return gulp.src(files)
              .pipe(jshint())
              .pipe(jshint.reporter('jshint-stylish'))
              .pipe(jshint.reporter('fail'));
});

gulp.task('test',['lint'],function() {
  return gulp.src('tests/test.js')
              .pipe(ava());
});

gulp.task('check', ['test']);
