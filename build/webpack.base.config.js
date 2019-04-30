/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: {
    index: './src/client/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true
              })]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }],
      },
      {
        test: /\.png$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      favicon: './src/client/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.js', '.ts'],
    // antd icon 不支持按需加载，使用替代方案完成
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../src/client/icons.js'),
    },
  },
  externals: {
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    bizcharts: 'BizCharts',
    '@antv/data-set': 'DataSet',
  },
};
