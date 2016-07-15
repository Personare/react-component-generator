const path = require('path');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, './../src/**/*.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, './../build'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    }
};
