var webpack = require("webpack")
  , path = require("path")

module.exports = function(entries, buildRoot, srcRoot, environment) {
  var entryForWebpack = {}

  entries.forEach(function(item) {
    entryForWebpack[item.relativeFilename] = item.entryPath
  })

  return {
    entry: entryForWebpack
  , resolve: {
      root: path.join(srcRoot, 'scripts')
    , alias: {
        MatchChengyu: path.join(srcRoot, '../MatchChengyu/lib')
      }
    }
  , output: {
      path: buildRoot
    , filename: '[name]'
    }
  , plugins: environment === 'production' ? [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ] : []
  , module: {
      loaders: [
        { test: /\.js$/
        , exclude: /node_modules/
        , loader: "babel-loader"
        , query: {compact: false}
        }
      ]
    }
  }
}
