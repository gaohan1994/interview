const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  mode: "development",
  target: "node",
  entry: "./index.js",
  resolve: {
    fallback: {
      fs: require.resolve('fs')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js"
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
}