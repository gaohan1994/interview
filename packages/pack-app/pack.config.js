
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: "bundle.js"
  }
}