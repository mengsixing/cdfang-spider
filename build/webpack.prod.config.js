/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const { default: WebpackDeepScopeAnalysisPlugin } = require('webpack-deep-scope-plugin');
const QiniuUploadPlugin = require('qiniu-upload-plugin');
const qiniuConfig = require('./qiniu.config');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  output: {
    publicPath: qiniuConfig.publicPath,
    path: path.resolve('./dist/client'),
    filename: 'cdfang-spider-[name]-[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'cdfang-spider-[name].[hash:8].css',
    }),
    new WebpackDeepScopeAnalysisPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
};

// ci 环境不上传cdn
if (process.env.BUILD_ENV !== 'ci' && process.env.BUILD_ENV !== 'analysis') {
  prodConfig.plugins.push(new QiniuUploadPlugin(qiniuConfig));
}

module.exports = merge(baseConfig, prodConfig);
