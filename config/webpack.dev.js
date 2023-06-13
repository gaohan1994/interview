const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const configFactory = require('./webpack.config');

const webpackDevServerConfig = {
  contentBase: '../public',
  hot: true,
  filename: 'bundle.js',
};

const compiler = webpack(configFactory);

const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

devServer.listen(3002, 'localhost', (error) => {
  if (error) {
    return console.log(error);
  }
});
