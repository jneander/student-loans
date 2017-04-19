process.env.NODE_ENV = 'development';

var config = require('../config/webpack.js');

config.module.loaders.push({
  exclude: '/node_modules/',
  loaders: ['style-loader', 'css-loader?localIdentName=[path][name]---[local]'],
  test: /\.(css)$/
});

module.exports = config;
