// Create React App Override config file. Doc: https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md
const path = require('path');

module.exports = {
  webpack: {
    configure: {
      entry: './src'
    }
  },
  configure: {
    output: {
      publicPath: './react-app/public'
    }
  },
  devServer: {
    port: process.env.REACT_APP_DEV_PORT
  }
}