const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin')
	.default;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const QiniuUploadPlugin = require('qiniu-upload-plugin');
const qiniuConfig = require('./qiniu.config');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
	mode: 'production',
	output: {
		publicPath: qiniuConfig.publicPath,
		path: path.resolve('./dist/client'),
		filename: 'cdfang-spider-[name]-[contenthash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
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
		new QiniuUploadPlugin(qiniuConfig),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		}),
		new WebpackDeepScopeAnalysisPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new OptimizeCSSAssetsPlugin({})
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors'
				}
			}
		}
	}
};

module.exports = merge(baseConfig, prodConfig);
