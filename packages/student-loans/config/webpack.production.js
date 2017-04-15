var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var config = require('../config/webpack.js');

config.bail = true;

config.module.loaders.push({
  exclude: path.join(__dirname, '..', 'node_modules'),

  loaders: ExtractTextPlugin.extract({
    use: {
      loader: 'css-loader?localIdentName=[hash:base64:10]'
    }
  }),

  test: /\.(css)$/
});

config.output.filename = 'js/[name].[hash:12].min.js';

config.plugins.unshift(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new ExtractTextPlugin('styles/index-[contenthash:10].css'));

module.exports = config;
