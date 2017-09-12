var gulp = require('gulp'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    paths = {
      js: [
        './src/katex-latex.js',
        './src/ASCIIMathTeXImg.js'
      ],
      bundle: [
        './dist/ASCIIMathTeXImg.min.js',
        './dist/katex-latex.min.js'
      ],
    },
    run = require('gulp-run');

gulp.task('default', ['build']);

gulp.task('build', function(){
  var es5 = gulp.src('./src/katex-latex.js')
    .pipe(babel({
      presets: ['env']
    }));
  var es5Min = gulp.src('./src/katex-latex.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }));
  var ascii = gulp.src('./src/ASCIIMathTeXImg.js');
  var asciiMin = gulp.src('./src/ASCIIMathTeXImg.js')
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }));
  var raw = merge(ascii)
    .add(es5)
    .pipe(concat('katex-latex.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist/'));

  var min = merge(asciiMin)
    .add(es5Min)
    .pipe(concat('katex-latex.min.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist/'));

    return merge(raw, min);
});
gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(rename({
      extname:'.min.js'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', ['js'], function(){
  return gulp.src(paths.bundle)
    .pipe(concat('katex-latex.bundle.min.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('start', ['build'], function(){
  gulp.watch(paths.js, ['build']);
});
