const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js'
  },
  devServer: {
    hot: true,
    inline: true,
    // 代理服务器端域名
    proxy: {
      '/': 'http://localhost:8082'
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/template/index.ejs',
      favicon: './build/template/favicon.ico',
      env: process.env.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

module.exports = merge(baseConfig, devConfig);
