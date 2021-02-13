const baseConfig = require('./webpack.common')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const config = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'],
  mode: 'development',
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = merge(baseConfig, config)
