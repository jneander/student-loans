var path = require('path');

var WebpackDevServer = require('webpack-dev-server');
var WriteFilePlugin = require('write-file-webpack-plugin');
var rimraf = require('rimraf');
var webpack = require('webpack');

var config = require('../config/webpack.development.js');

config.entry.index.unshift('react-hot-loader/patch');
config.entry.index.push('webpack/hot/dev-server');
config.entry.index.push('webpack-dev-server/client?http://localhost:8080/');

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

if (process.env.WRITE_TO_DIST) {
  config.plugins.push(new WriteFilePlugin());
}

rimraf.sync(config.output.path);
var compiler = webpack(config);

compiler.run(function (err, stats) {
  if (!err) {
    var server = new WebpackDevServer(compiler, {
      contentBase: config.output.path,
      filename: config.output.filename,
      hot: true,
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    });
    server.listen(8080, 'localhost', function () {});
  }
});
