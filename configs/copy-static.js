'use strict'

const glob = require('glob')
const path = require('path')
const watch = require('gulp-watch')

function createFileMatch(fileTypes) {
  fileTypes = fileTypes.join(',')
  return `./**/*.{${fileTypes}}`
}

function copyStaticEnvironment(gulp, environment) {
  var srcRoot = path.join(__dirname, '../', 'src')
    , buildRoot = path.join(
        __dirname, '../', 'dist'
      )
    , commonMonitorFileTypes = [
        'css', 'swf'
      , 'eot', 'ttf', 'woff'
      , 'png', 'jpg', 'jpeg', 'gif', 'ico'
      , 'html', 'json'
      ]

  if (environment === 'development') {
    return () => {
      let source = path.join(srcRoot , createFileMatch(
        commonMonitorFileTypes.concat(['html', 'shtml', 'pug'])
      ))

      return gulp.src(source)
        .pipe(watch(source))
        .pipe(gulp.dest(buildRoot))
    }
  }

  return () => {
    let source = path.join(srcRoot, createFileMatch(commonMonitorFileTypes))

    return gulp.src(source).pipe(gulp.dest(buildRoot))
  }
}

module.exports = copyStaticEnvironment
