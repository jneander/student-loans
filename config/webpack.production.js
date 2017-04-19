var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

process.env.NODE_ENV = 'production';

var config = require('../config/webpack.js');

config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new ExtractTextPlugin('styles/index-[contenthash:10].css'));

config.module.loaders.push({
  exclude: '/node_modules/',
  loaders: ExtractTextPlugin.extract({
    use: {
      loader: 'css-loader?localIdentName=[hash:base64:10]'
    }
  }),
  test: /\.(css)$/
});

config.output.filename = 'js/bundle.[hash:12].min.js';

module.exports = config;
