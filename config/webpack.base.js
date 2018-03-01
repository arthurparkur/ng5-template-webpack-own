var webpack = require('webpack');
var helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry  : {
        'bundle': [
            helpers.root('src', 'polyfills'),
            helpers.root('src', 'main')
        ],
        'styles': './src/global.scss'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module : {
        rules: [
            {
                test: /\.ts?$/,
                use : ['awesome-typescript-loader?configFileName=tsconfig.json', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                exclude: [ /node_modules/, helpers.root('src', 'global.scss') ],
                use: [ 'css-loader', 'sass-loader' ]
            },
            {
                test: /global\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                })
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'),
            {}
        )
    ]
};