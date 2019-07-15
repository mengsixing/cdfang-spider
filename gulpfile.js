const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('default', () => gulp
  .src('./src/nodeuii/**/*.ts')
  .pipe(
    // 使用 .babelrc 配置
    babel()
  )
  .pipe(gulp.dest('./dist/')));

if (process.env.NODE_ENV !== 'production') {
  gulp.watch('./src/nodeuii/**/*.ts', gulp.series('default'));
}
