var path = require('path');

var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: { react: ['react', 'react-dom'] },

  module: {
    rules: [{
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
    }]
  },

  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test')
      }
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
