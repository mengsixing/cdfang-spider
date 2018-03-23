var gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
	gulp.src('./nodeuii/**/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('./dist/'))
);

gulp.watch('./nodeuii/*.js', ['default']);
