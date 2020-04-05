const path = require('path');

module.exports = {
  entry: {
    index: './src/client/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 缓存上次编译结果，避免每次重新编译，减少打包时间
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: 'url-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts']
  },
  externals: {
    lodash: '_',
    react: 'React',
    bizcharts: 'BizCharts',
    '@antv/data-set': 'DataSet'
  }
};
