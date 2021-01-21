const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './client/js/index.js', './client/css/app.less'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.build'),
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|bmp|png)$/i,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(css|less)$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/public/index.html'
    })
  ]
}