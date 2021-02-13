const baseConfig = require('./webpack.common')

const { merge } = require('webpack-merge')

const config = {
  mode: 'production'
}

module.exports = merge(baseConfig, config)
