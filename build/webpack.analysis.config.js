const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.prod.config');

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
