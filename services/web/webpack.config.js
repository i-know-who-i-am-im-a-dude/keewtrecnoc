const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv').config({path: __dirname + '/.env'})

const port = process.env.PORT || 3000

module.exports = {
  // Webpack configuration goes here
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // First Rule
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // Second Rule
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/public/index.html'
      // favicon: 'public/favicon.ico'
    }),
    new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parsed)
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    contentBase: path.join(__dirname, 'public', 'static'),
    https: {
      cert: fs.readFileSync(`${__dirname}/../../cert.pem`),
      key: fs.readFileSync(`${__dirname}/../../key.pem`)
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     pathRewrite: {'^/api' : ''},
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }
}