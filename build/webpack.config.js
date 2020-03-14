var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/bindingx.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/dist/',
    filename: 'bindingx.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map'
};