var gulp = require('gulp');


const babel = require('gulp-babel');

gulp.task('default', () =>
  gulp.src('./nodeuii/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/'))
);


if(!process.env.NODE_ENV=='production'){
  gulp.watch('./nodeuii/*.js', ['default']);
}


