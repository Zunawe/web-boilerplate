const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './src/client/js/index.tsx', './src/client/css/app.less'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.build', 'client'),
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
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.client.development.json'
            }
          }
        ]
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
      template: 'src/client/public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}