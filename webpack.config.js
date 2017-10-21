'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    path: __dirname + '/dist',
    filename: './js/app.js'
  },
  module: {
    rules: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.pug']
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.pug'})
  ]
};
