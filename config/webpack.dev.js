const baseConfig = require('./webpack.base.js');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    output : {
        path    : helpers.root('dist'),
        filename: '[name].js',
        publicPath: 'http://localhost:4000/',
    },
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'/*,
        TODO setup when REST service ready
        proxy: {
            '/api/**': {
                target: 'http://localhost:8080/your-rest-service',
                secure: false,
                changeOrigin: true
            }
        }*/
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }])
    ]
});
