var fs = require('fs');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var bundlePath = path.join(__dirname, '..', 'lib/bundles');

var entries = {
  index: [
    'babel-polyfill',
    path.join(bundlePath, 'index.js')
  ]
};
var plugins = [
  new HtmlWebpackPlugin({
    chunks: ['index'],
    filename: 'index.html',
    template: path.join(__dirname, '..', 'lib/markup/index.html')
  })
];

fs.readdirSync(bundlePath).forEach(function (filename) {
  if (filename === 'index.js') {
    return;
  }

  var basename = path.basename(filename, '.js');

  entries[basename] = [
    'babel-polyfill',
    path.join(bundlePath, filename)
  ];

  plugins.push(
    new HtmlWebpackPlugin({
      chunks: [basename],
      filename: basename + '/index.html',
      template: path.join(__dirname, '..', 'lib/markup/index.html')
    })
  );
});

module.exports = {
  entries: entries,
  plugins: plugins
};
