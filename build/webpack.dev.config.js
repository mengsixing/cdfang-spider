const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: './client/index.js'
	},
	output: {
		path: path.resolve('./dist/client'),
		filename: '[name].js'
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
		lodash: '_',
		react: 'React',
		'react-dom': 'ReactDOM',
		bizcharts: 'BizCharts',
		'@antv/data-set': 'DataSet'
	}
};
