const webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const openUrl = require('openurl');

new WebpackServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath
}).listen('8000', 'localhost', error => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const url = 'http://localhost:8000';

  console.log(`Demo is ready at ${url}`);
  openUrl.open(url);
});
