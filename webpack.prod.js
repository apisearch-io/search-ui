const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.base');

const plugins = [
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        compress: {warnings: false},
        output: {comments: false}
    })
];

/**
 * Production configuration
 */
const browserConfig = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'apisearch-ui.min.js',
        libraryTarget: 'umd',
        library: 'apisearchUI'
    },
    plugins: plugins
});

module.exports = [browserConfig];