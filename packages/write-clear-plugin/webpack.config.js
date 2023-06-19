const path = require('path')
const MyWebpackCleanPlugin = require('my-webpack-clean-plugin')

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "my-clean-plugin.bundle[hash].js"
  },
  plugins: [
    new MyWebpackCleanPlugin()
  ]
}