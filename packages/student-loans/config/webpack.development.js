var webpack = require('webpack');

var config = require('../config/webpack.js');

config.module.loaders.push({
  exclude: '/node_modules/',
  loaders: ['style-loader', 'css-loader?localIdentName=[path][name]---[local]'],
  test: /\.(css)$/
});

config.plugins.unshift(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
}));

// prints more readable module names in the browser console on HMR updates
config.plugins.push(new webpack.NamedModulesPlugin());

module.exports = config;
