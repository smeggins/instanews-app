const gulp = require('gulp');
const terser = require('gulp-terser'),
      rename = require('gulp-rename');
      browserSync = require('browser-sync').create();
      eslint = require('gulp-eslint');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('scripts', function() {
    return gulp.src('./src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
})

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
})

gulp.task('watch', function() {
    gulp.watch('./src/*.js', gulp.parallel('scripts', 'reload'));
    gulp.watch('index.html', gulp.parallel('reload'))
    gulp.watch('./styles/style.css', gulp.parallel('reload'))

});



gulp.task('default', gulp.parallel('watch', 'browser-sync'))



