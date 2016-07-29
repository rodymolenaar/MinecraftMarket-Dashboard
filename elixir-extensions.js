var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

Elixir.extend('fileinclude', function() {

  new Task('fileinclude', function() {

    return gulp.src(['./src/pages/**/*.html', '!./src/pages/components/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
  })
  .watch(['./src/pages/**/*.html']);

});
