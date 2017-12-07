const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

/**
 * Development configuration
 */
const browserConfig = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'apisearch-ui.js',
        libraryTarget: 'umd',
        library: 'apisearchUI'
    }
});

const nodeConfig = merge(baseConfig, {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'apisearch-ui.node.js',
        libraryTarget: 'umd',
        library: 'apisearchUI'
    }
});

module.exports = [browserConfig, nodeConfig];