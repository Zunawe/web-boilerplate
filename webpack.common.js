const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config/config.json')

module.exports = {
  entry: ['./client/js/index.tsx', './client/css/app.less'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'client'),
    publicPath: `${config.basePath}/static`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'client/tsconfig.json'
            }
          }
        ]
      },
      {
        test: /\.(jpg|bmp|png|svg)$/i,
        type: 'asset/resource'
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
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}
