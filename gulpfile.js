const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require("gulp-postcss"),
      cssnano = require('cssnano'),
      autoprefixer = require('autoprefixer'),
      babel = require('gulp-babel'),
      minify = require("gulp-babel-minify");


const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('scss', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles'))
    .pipe(browserSync.stream());
});

gulp.task('server', gulp.series('scss', () => {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    notify: false,
  });
}));

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

gulp.task('dev', gulp.parallel('server', 'watch'));

gulp.task('styles', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./build/styles'))
});

gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
});

gulp.task('pics', () => {
  return gulp.src('./src/img/*')
    .pipe(gulp.dest('./build/img'))
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
});

gulp.task('scripts', () => {
  return gulp.src('./src/scripts/main.js')
    .pipe(babel())
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest('./build/scripts'))
});

gulp.task('build', gulp.parallel('html', 'styles', 'pics', 'fonts', 'scripts'));
