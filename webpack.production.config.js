const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./client/js/index.js', './client/css/app.less'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.build'),
    publicPath: '/'
  },
  mode: 'production',
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
    new HtmlWebpackPlugin({
      template: 'client/public/index.html'
    })
  ]
}
