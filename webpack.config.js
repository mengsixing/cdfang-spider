const HtmlWebpackPlugin = require('html-webpack-plugin');
var mode = process.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
	mode: mode,
	entry: {
		index: './client/index.js'
	},
	output: {
		path: __dirname + '/dist/client',
		chunkFilename: '[name][hash].bundle.js',
		filename: 'bundle.js'
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
		})
	],
	externals: {
		'lodash': '_',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'bizcharts': 'BizCharts',
		'@antv/data-set': 'DataSet',
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all'
		}
	}
};
