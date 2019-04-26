/* eslint-disable @typescript-eslint/no-var-requires */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const config = require('./webpack.prod.config');

// 检查loader，plugin的运行速度
// const smp = new SpeedMeasurePlugin();

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;// smp.wrap();
