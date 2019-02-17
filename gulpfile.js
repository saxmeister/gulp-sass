const gulp     = require('gulp'),
      babel    = require('gulp-babel'),
      clean    = require('gulp-clean-css'),
      concat   = require('gulp-concat'),
      eslint   = require('gulp-eslint'),
      minify   = require('gulp-minify'),
      order    = require('gulp-order'),
      sass     = require('gulp-sass'),
      sassLint = require('gulp-sass-lint'),
      shell    = require('gulp-shell'),
      strip    = require('gulp-strip-css-comments')

/* css - compiles the SCSS files into one .css file */
gulp.task('css', () => gulp.src([
    'scss/vendor/module',
    'scss/base/*.scss',
    'components/**/*.scss'
  ])
  .pipe(sass({
    includePaths: [
      'node_modules/flexboxgrid/dist', // Create external path aliases for @import shortcuts
      'node_modules/font-awesome/scss'
    ]
  }))
  .pipe(order([
    'scss/vendor/*.scss',
    'scss/base/*.scss',
    'components/**/*.scss'
  ]))
  .pipe(sassLint({ configFile: 'config/.sass-lint.yml' }))
  .pipe(sassLint.format())
  .pipe(strip())
  .pipe(sassLint.failOnError())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(clean({ compatibility: 'ie8' }))
  .pipe(gulp.dest('./dist/'))
)




/* js - compiles all of the JavaScript into on compiled and minified library */
gulp.task('js', () => gulp.src([
    'js/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint({ configFile: 'config/.eslintrc'}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(concat('scripts.js'))
  .pipe(minify({
    ext: { src: '.js', min: '.min.js' }
  }))
  .pipe(gulp.dest('./dist/'))
)

// cr - runs drush cr from the command line to clear Drupal's cache
gulp.task('cr', function() {
  console.log('- Clearing Drupal cache');
  return gulp.src('', {
      read: false
    })
    .pipe(shell(['../../../../vendor/bin/drush cr'])
  );
})

// sass:watch - watch all SCSS files for changes
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass'])
})

// js:watch - watch all JS files for changes
gulp.task('js:watch', () =>
  gulp.watch('./js/**/*.js', ['js'])
)

// watch - watch all SCSS and JS files for changes
gulp.task('watch', ['sass:watch', 'js:watch'])

// default - the default process when just 'gulp' is typed - runs all gulp tasks in the array
gulp.task('default', ['css', 'js', 'drushcr'])
