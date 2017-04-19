var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var PRODUCTION = process.env.NODE_ENV === 'production';
var DEVELOPMENT = !PRODUCTION;

module.exports = {
  devtool: 'source-map',

  entry: [
    path.join(__dirname, '..', 'lib/js/index.js')
  ],

  module: {
    loaders: [{
      exclude: '/node_modules/',
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0'
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
    filename: 'js/bundle.js',
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'lib/markup/index.html')
    })
  ],

  resolve: {
    modules: [
      path.join(__dirname, '..', 'lib'),
      'node_modules'
    ]
  },

  stats: {
    colors: true
  }
};
