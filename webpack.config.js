var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    /* The reason for publicPath is so assets will always be retreieved
    from the home directory. This is useful on load. If a user reloads the page
    at '/popular', the browsers will try and grab the assets from '/popular' */
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    })
  ]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
