'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const minify = require('gulp-minify');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
webpackConfig.watch = true;

gulp.task('index', function(){
  return gulp.src('./src/home.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function(){
  return gulp.src('./src/stylus/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('login', function(){
  return gulp.src('./src/login.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function(){
  nodemon({
    script: 'server/server.js',
    watch: 'server/',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('webpack', function(){
  webpack(webpackConfig, function(err, stats){
    if( err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString('minimal'));
  })
})

gulp.task('default', ['index', 'login', 'stylus', 'webpack', 'server'], function(){
  gulp.watch('./src/**/*.styl', ['stylus']);
  gulp.watch('./src/index.pug', ['index']);
  gulp.watch('./src/login.pug', ['login']);
});
