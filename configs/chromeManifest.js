'use strict'

const path = require('path')
const manifest = require('gulp-chrome-manifest')

function chromeManifest(gulp, environment) {
  var srcRoot = path.join(__dirname, '../', 'src')
    , buildRoot = path.join(__dirname, '../', 'dist')

  return () => {
    if (environment !== 'production') {
      return
    }

    return gulp.src(path.join(srcRoot, './manifest.json'))
      .pipe(manifest({
        buildnumber: true,
        background: {
          target: 'scripts/background.js',
          exclude: [
            'scripts/chromereload.js'
          ]
        }
      }))
      .pipe(gulp.dest(buildRoot))
  }
}

module.exports = chromeManifest
