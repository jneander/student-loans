var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var PRODUCTION = process.env.NODE_ENV === 'production';
var DEVELOPMENT = !PRODUCTION;

module.exports = {
  devtool: 'source-map',

  entry: {
    index: [
      'babel-polyfill',
      path.join(__dirname, '..', 'lib/js/pages/index.js')
    ],
    signin: [
      'babel-polyfill',
      path.join(__dirname, '..', 'lib/js/pages/signin.js')
    ],
    react: ['react', 'react-dom']
  },

  externals: {
    'google-api': 'gapi'
  },

  module: {
    loaders: [{
      exclude: path.join(__dirname, '..', 'node_modules'),
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['react-hot-loader/babel'],
          presets: [
            ['es2015', { modules: false }],
            'babel-preset-stage-1',
            'react'
          ]
        }
      }
    }, {
      exclude: '/node_modules/',
      loaders: ['url-loader?limit=10000&name=img/[hash:12]/[ext]'],
      test: /\.(png|jpg|gif)$/
    }]
  },

  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      template: path.join(__dirname, '..', 'lib/markup/index.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['signin'],
      filename: 'signin.html',
      template: path.join(__dirname, '..', 'lib/markup/signin.html')
    })
  ],

  resolve: {
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      React: path.resolve(__dirname, '../node_modules/react')
    },

    modules: [
      path.join(__dirname, '..', 'lib'),
      'node_modules'
    ]
  },

  stats: {
    colors: true
  }
};
