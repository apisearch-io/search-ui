const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/index.js',
    output: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                })
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ['.json', '.js', '.sass']
    },
    plugins: [
        new ExtractTextPlugin('../dist/apisearch-ui.css')
    ]
};