const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const commons = {
  context: path.join(__dirname, 'lib'),
  entry: './index.js',
  output: {
    library: 'MysamUi',
    libraryTarget: 'umd',
    filename: path.join('dist', 'mysam-ui.js')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

const dev = {
  devtool: 'source-map',
  devServer: {
    port: 3030,
    contentBase: '.'
  }
};

const production = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'mysam-ui.min.js'
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

module.exports = merge(commons, env !== 'development' ? production : dev);
