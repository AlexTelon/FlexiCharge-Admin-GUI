// Create React App Override config file. Doc: https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md
const path = require('path');

module.exports = {
  webpack: {
    configure: {
      entry: './src'
    },
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "components": path.resolve(__dirname, 'src/components'),
      "types": path.resolve(__dirname, 'src/types'),
      "@remote-access": path.resolve(__dirname, 'src/remote-access')
    }
  },
  devServer: {
    port: process.env.REACT_APP_DEV_PORT
  }
}