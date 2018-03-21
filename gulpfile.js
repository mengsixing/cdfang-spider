var gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src('server.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist'))
);
