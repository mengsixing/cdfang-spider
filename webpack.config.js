var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: './client/App.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './client'),
        //publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 定义webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
        hot: true,
        // 模块热更新。依赖于HotModuleReplacementPlugin
        noInfo: false,
        // 在命令行窗口显示打包信息
    }
}