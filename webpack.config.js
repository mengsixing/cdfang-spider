const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index:'./client/index.js'
  },
  output: {
    path: __dirname+'/dist/client',
    chunkFilename: '[name].bundle.js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  
      template: './client/index.html'
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks:'all'
    },
  }
};
