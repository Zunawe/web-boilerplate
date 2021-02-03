const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/client/js/index.tsx', './src/client/css/app.less'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.build', 'client'),
    publicPath: '/'
  },
  mode: 'production',
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
              configFile: 'tsconfig.client.production.json'
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
    new HtmlWebpackPlugin({
      template: 'src/client/public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}
