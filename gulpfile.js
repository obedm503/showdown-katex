var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
    paths = {
      js: ['./src/katex-latex.js','./dist/ASCIIMathTeXImg.js'],
			bundle: ['./dist/ASCIIMathTeXImg.min.js', './dist/katex-latex.min.js']
    },
		run = require('gulp-run');

gulp.task('default', ['bundle']);

gulp.task('js', function(){
  return gulp.src(paths.js)
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

gulp.task('serve', ['bundle'], function(){
  gulp.watch(paths.js, ['bundle']);
	run('http-server').exec();
});
