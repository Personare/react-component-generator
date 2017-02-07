'use strict'

const { join } = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const personareModules = (...newPath) => {
  return join(__dirname, '..', 'node_modules', '@personare', ...newPath)
}

const sameKeyAndValue = (object, key) => {
  object[key] = key
  return object
}

module.exports = validate({
  entry: join(__dirname, '..', 'src', 'index.js'),

  output: {
    path: 'dist',
    filename: '<%= camelName %>.js',
    library: '<%= camelName %>',
    libraryTarget: 'umd'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          join(__dirname, '..', 'src'),
          personareModules()
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        include: [
          join(__dirname, '..', 'src'),
          personareModules()
        ]
      }
    ]
  },

  externals: [
    'react',
    'react-dom'
  ].reduce(sameKeyAndValue, {}),

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
