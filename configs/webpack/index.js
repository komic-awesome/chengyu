'use strict'

const glob = require("glob")
const path = require('path')
const webpack = require("webpack")
const watch = require('gulp-watch')
const gutil = require("gulp-util")
const WebpackDevServer = require("webpack-dev-server");

function compileWebpackWithEnvironment(gulp, environment) {
  var srcRoot = path.join(__dirname, '../../', 'src')
    , buildRoot = path.join(__dirname, '../../', 'dist')

  return () => {
    let createWebpackConfig = require('./webpack.config.js')
      , noop = function() {}

    var entries = glob.sync(path.join(srcRoot, './**/{background,chromereload,contentscript,options}.js'))
      .map((entryPath) => {
        let entryName = path.basename(entryPath, '.entry.js')
          , relativeEntryPath = path.relative(srcRoot, entryPath)

        return {
          name: path.basename(entryPath)
        , relativeFilename: relativeEntryPath
        , entryPath: entryPath
        }
      })

    var configs = createWebpackConfig(entries, buildRoot, srcRoot, environment)

    var compiler = webpack(configs, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log('[webpack]', stats.toString('normal'))
    })

    if (environment === 'development') {

      compiler.watch({
        aggregateTimeout: 300
      , poll: true
      }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err)
        gutil.log('[webpack:build]', stats.toString('normal'));
      })

    } else {
      compiler.run(noop)
    }
  }
}

module.exports = compileWebpackWithEnvironment
