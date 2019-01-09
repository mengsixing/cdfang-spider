const gulp = require('gulp');

const babel = require('gulp-babel');

gulp.task('default', () => gulp
  .src('./src/nodeuii/**/*.js')
  .pipe(
    babel({
      presets: ['@babel/preset-env'],
    }),
  )
  .pipe(gulp.dest('./dist/')));

if (process.env.NODE_ENV !== 'production') {
  gulp.watch('./src/nodeuii/**/*.js', gulp.series('default'));
}
