const path = require('path');

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "components/*": path.resolve(__dirname, "src/components/*"),
            "types/*": path.resolve(__dirname, "src/types/*")
        }
    },
    devServer: {
        port: process.env.REACT_APP_DEV_PORT
    }
}