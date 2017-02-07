'use strict'

const { join } = require('path')
const { readdirSync } = require('fs')
const webpackConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js')

module.exports = (config, env) => {
  const newConfig = webpackConfig(config, env)
  const personareModules = (...newPath) => {
    return join(__dirname, '..', 'node_modules', '@personare', ...newPath)
  }

  newConfig.module.preLoaders = [{
    test: /\.js$/,
    exclude: /node_modules/,
    include: join(__dirname, '..'),
    loader: 'eslint-loader'
  }]

  const dependenciesDirectory = [personareModules()]

  newConfig.module.loaders = newConfig.module.loaders.map((loader) => {
    if (loader.test.test('test.css')) {
      return Object.assign({}, loader, {
        include: loader.include.concat(dependenciesDirectory)
      })
    }

    return loader
  })
  .concat({
    test: /react\-.+\.js$/,
    loader: 'babel-loader',
    include: dependenciesDirectory
  })

  newConfig.resolve = {
    alias: readdirSync(personareModules())
      .filter((dir) => dir !== 'react-storybook-decorator-github-corner')
      .reduce((acc, dir) => {
        acc['@personare/' + dir] = personareModules(dir, 'src')
        return acc
      }, {})
  }

  return newConfig
}
