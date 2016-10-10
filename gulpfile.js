var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    paths = {
      js: ['./src/katex-latex.js']
    };

gulp.task('default', ['js']);

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

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']);
});
