var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var header  = require('gulp-header');
var package = require('./package.json');

// Banner
var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.description %>\n' +
    ' * <%= package.repository.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
  ].join('');

// Compile scss to css
function styling(){
    // Where my scss file
    return gulp.src('./scss/style.scss')
    // Pass that file through sass compiler
    .pipe(sass().on('error',sass.logError))
    // Autoprefixer
    .pipe(autoprefixer('last 4 version'))
    // Header
    .pipe(header(banner, { package : package }))
    // Where do I save the compiled css
    .pipe(gulp.dest('./assets/css'))
    // Stream changes to all browser
    .pipe(browserSync.stream());
}

function watching(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', styling);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

exports.styling = styling;
exports.watching = watching;