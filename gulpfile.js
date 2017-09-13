var gulp = require('gulp'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    queue = require('streamqueue'),
    paths = {
      js: [
        './src/katex-latex.js',
        './src/ASCIIMathTeXImg.js'
      ],
      bundle: [
        './dist/ASCIIMathTeXImg.min.js',
        './dist/katex-latex.min.js'
      ],
      katexLatex: './src/katex-latex.js',
      asciiMath: './src/ASCIIMathTeXImg.js',
    },
    run = require('gulp-run');

gulp.task('default', ['build']);

gulp.task('build', function(){
  var es5 = gulp.src(paths.katexLatex)
    .pipe(babel({
      presets: ['env']
    }));
  var es5Min = gulp.src(paths.katexLatex)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }));
  var ascii = gulp.src(paths.asciiMath);
  var asciiMin = gulp.src(paths.asciiMath)
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }));
  var raw = queue({ objectMode: true }, ascii, es5)
    .pipe(concat('katex-latex.js', { newLine: '\n\n' }))
    .pipe(gulp.dest('./dist/'));

  var min = queue({ objectMode: true }, asciiMin, es5Min)
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
  gulp.watch([paths.katexLatex, paths.asciiMath], ['build']);
});
