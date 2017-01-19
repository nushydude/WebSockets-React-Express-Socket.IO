var path = require('path');
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: 'public',
    filename: 'app.js'
  },
  // assumes all JavaScript files you edit will be in src/
  // when importing from src/<file>.js, only need to specify as <file>
  resolve: {
    root: path.resolve('./src'), // must be absolute path
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map', // source maps to ease debugging
  module: {
    loaders: [
      {
        // pre-process every *.js file (except for ones in
        // node_modules/) with Babel:
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader', // auto-refreshes browser
          // invokes Babel to translate React and ES6
          'babel-loader?cacheDirectory&presets[]=react&presets[]=es2015'
        ]
      },
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
