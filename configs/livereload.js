'use strict'

const glob = require('glob')
const path = require('path')
const livereload = require('gulp-livereload')


function taskCreator(gulp, environment) {

  let srcRoot = path.join(__dirname, '../', 'src')

  return () => {
    if (environment === 'development') {
      livereload.listen()

      gulp.watch([
        path.join(srcRoot, './**/*')
      ]).on('change', livereload.reload);
    }
  }
}

module.exports = taskCreator
