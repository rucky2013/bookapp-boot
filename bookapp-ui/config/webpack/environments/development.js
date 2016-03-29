'use strict';

module.exports = function (_path) {
    return {
        context: _path,
        debug: true,
        devtool: 'cheap-source-map',
        devServer: {
            contentBase: '../bookapp-web/src/main/resources/static',
            info: true,
            hot: false,
            inline: true,
            port: 8081,
            proxy: {
                "*": "http://localhost:8080"
            }
        }
    }
};
