const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
// const QiniuUploadPlugin = require('qiniu-upload-plugin');
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
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
			}
		]
	},
	plugins: [
		// new QiniuUploadPlugin(qiniuConfig),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		})
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
