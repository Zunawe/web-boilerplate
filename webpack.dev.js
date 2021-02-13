const baseConfig = require('./webpack.common')

const webpack = require('webpack')
const { mergeWithRules } = require('webpack-merge')

const config = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true'],
  mode: 'development',
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                sourceMap: true
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: {
        loader: 'match',
        options: 'merge',
      },
    },
  },
})(baseConfig, config)
