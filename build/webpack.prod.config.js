const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MyQiniuUploadPlugin = require('./myQiniuUploadPlugin');
const qiniuConfig = require('./qiniu.config');

module.exports = {
	mode: 'production',
	entry: {
		index: './client/index.js'
	},
	output: {
		publicPath: qiniuConfig.publicPath,
		path: path.resolve('./dist/client'),
		filename: 'cdfang-spider-[name]-[contenthash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html'
		}),
		new MyQiniuUploadPlugin()
	],
	externals: {
		lodash: '_',
		react: 'React',
		'react-dom': 'ReactDOM',
		bizcharts: 'BizCharts',
		'@antv/data-set': 'DataSet'
	},
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		}
	}
};
