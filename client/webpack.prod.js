const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackCommonConfig = require('./webpack.common.js');

module.exports = merge( webpackCommonConfig, {
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js'
  },
  mode: 'production',
  plugins: [
    new UglifyJSPlugin()
  ]

});

