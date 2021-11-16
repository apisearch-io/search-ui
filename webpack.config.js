const path = require('path');

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, 'src') + '/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "babel-loader",
          include: [
            path.resolve(__dirname, "src"),
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: 'source-map',
    mode: env.production ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: env.production
        ? (env.ie ? 'apisearch-ui.ie.min.js' : 'apisearch-ui.min.js')
        : (env.ie ? 'apisearch-ui.ie.js' : 'apisearch-ui.js'),
      library: 'apisearchUI',
      libraryExport: 'default'
    }
  }
};
