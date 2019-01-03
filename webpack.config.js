const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const commons = {
  context: path.join(__dirname, 'src'),
  entry: [ 'babel-polyfill', './index.js' ],
  output: {
    library: [ 'mysam', 'ui' ],
    libraryTarget: 'umd',
    filename: path.join('dist', 'mysam-ui.js')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(@feathersjs|feathers|mysam|debug))/,
      loader: 'babel-loader'
    }]
  },
  node: {
    fs: 'empty'
  }
};

const dev = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3030,
    contentBase: '.',
    compress: true
  }
};

const production = {
  mode: 'production',
  output: {
    filename: path.join('dist', 'mysam-ui.min.js')
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

module.exports = merge(commons, env !== 'development' ? production : dev);
