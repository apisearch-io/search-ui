const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/index.ts',
    output: {},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [
                    path.resolve(__dirname, "src"),
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json' ]
    }
};