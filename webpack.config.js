const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: './client/bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({  
          filename: './client/index.html',
          template: './client/index.html'
        })
      ]
};
