const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const config = require('./webpack.prod.config');

// 检查loader，plugin的运行速度（打开时运行很慢，先关闭）
// const smp = new SpeedMeasurePlugin();

config.plugins.push(new BundleAnalyzerPlugin());

// module.exports = smp.wrap(config);
module.exports = config;
