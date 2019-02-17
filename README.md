# gulp-sass
A quick start Gulpfile.js to assist with configuring SASS compilation with Drupal and Pattern Lab.

This gulpfile.js will do the following:

- css - compiles the SCSS files into one .css file
- js - compiles all of the JavaScript into on compiled and minified library
- cr - runs drush cr from the command line to clear Drupal's cache
- sass:watch - watch all SCSS files for changes
- js:watch - watch all JS files for changes
- watch - watch all SCSS and JS files for changes
- default - the default process when just 'gulp' is typed - runs all gulp tasks in the array

##Configuring
This gulpfile.js will need to be configured for your specific Drupal environment. This could also work with Pattern Lab with some slight configuration changes to make it include the .SCSS files in the atoms, elements, molecules, etc.
