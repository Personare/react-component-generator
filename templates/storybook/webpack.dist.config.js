'use strict'

const path = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = validate({
  entry: path.resolve('.', 'src', 'index.js'),

  output: {
    path: 'dist',
    filename: '<%= camelName %>.js',
    libraryTarget: 'umd'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: path.resolve(__dirname, '..')
      }
    ]
  },

  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },

  plugins: [
    new ExtractTextPlugin('<%= camelName %>.css'),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})
