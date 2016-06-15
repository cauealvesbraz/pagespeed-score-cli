'use strict';
const gulp = require('gulp');
const notify = require('gulp-notify');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const ava = require('gulp-ava');
const babel = require('gulp-babel');
const files = ['*.js','src/*.js'];

gulp.watch(files, ['check']);

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

gulp.task('check', ['test'],function() {
  return gulp.src('/')
              .pipe(notify({
                title: 'Task Builder',
                message: 'Successfully built application'
              }));
});
