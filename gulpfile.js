const gulp = require('gulp');
const terser = require('gulp-terser'),
      rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('./src/*.js')
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
})

gulp.task('default', function(done) {
    console.log('hello world')
    done();
})

gulp.task('default', gulp.parallel('scripts'))