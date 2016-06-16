'use strict';
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');
var ava = require('gulp-ava');
var babel = require('gulp-babel');
var files = ['*.js','dist/*.js'];


gulp.task('transpile',function() {
  return gulp.src('src/*.js')
              .pipe(babel())
              .pipe(gulp.dest('dist'));
});
gulp.task('jscs', ['transpile'],function() {
  return gulp.src(files)
              .pipe(jscs());
});

gulp.task('lint', ['jscs'],function() {
  return gulp.src(files)
              .pipe(eslint(
                  {
                    "parser": "babel-eslint",
                    "parserOptions": {
                      "sourceType": "module"
                    },
                    env:{
                      node:true
                    }
                  }
              ))
              .pipe(eslint.format())
              .pipe(eslint.failAfterError());
});

gulp.task('test',['lint'],function() {
  return gulp.src('test.js')
              .pipe(ava());
});

gulp.task('check', ['test']);
