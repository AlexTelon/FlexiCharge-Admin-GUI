const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: process.env.REACT_APP_DEV_PORT
  }
}