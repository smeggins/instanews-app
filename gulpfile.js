/* eslint-disable no-undef */
/* eslint-disable quotes */
const gulp = require('gulp');
      terser = require('gulp-terser');
      rename = require('gulp-rename');
      browserSync = require('browser-sync').create();
      eslint = require('gulp-eslint');
const sass = require("gulp-sass");
      autoprefixer = require("gulp-autoprefixer"),
      cssnano = require("gulp-cssnano"),

gulp.task('sass', function() {
    return gulp
        .src('./sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest("./build/css"));
});

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
    gulp.watch(`./sass/*.scss`, gulp.parallel('sass'))
    gulp.watch('./build/css/style.min.css', gulp.parallel('reload'))

});



gulp.task('default', gulp.parallel('watch', 'browser-sync'))



