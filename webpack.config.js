'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    filename: './dist/js/app.js'
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        exclue: /node_modules/
      }, {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false } })
  ]
};
