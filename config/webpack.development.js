var webpack = require('webpack');

process.env.NODE_ENV = 'development';

var config = require('../config/webpack.js');

config.module.loaders.push({
  exclude: '/node_modules/',
  loaders: ['style-loader', 'css-loader?localIdentName=[path][name]---[local]'],
  test: /\.(css)$/
});

config.plugins.push(new webpack.NamedModulesPlugin());

module.exports = config;
