'use strict'

const gulp = require('gulp')
const path = require('path')
const utils = require('./configs/utils')(gulp)

utils.loadTasks(
  [ [ require('./configs/webpack'), 'compile-javascript' ]
  , [ require('./configs/copy-static'), 'copy-static' ]
  , [ require('./configs/livereload'), 'livereload' ]
  ]
)

;[
  ['watch', 'development']
, ['build', 'production']
].forEach((tuple) => {
  let taskName = tuple[0]
    , environment = tuple[1]

  gulp.task(taskName, () => {
    utils.runTasks(
        [ 'compile-javascript'
        , 'copy-static'
        , 'livereload'
        ]
      , environment)
  })
})

gulp.task('default', () => {
  utils.listCommands()
})
