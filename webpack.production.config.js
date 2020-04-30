const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'none',//使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle-[hash].js"//打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true
  },
  module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                       modules: {
                         localIdentName: "[name]__[local]--[hash:base64:5]" // 指定css的类名格式
                       }
                   }
                }, {
                     loader: "postcss-loader"
                }]
        }
    ]
  },
  plugins: [
       new webpack.BannerPlugin('版权所有，翻版必究'),
       new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
       new MiniCssExtractPlugin({
            filename: 'style-[contenthash:8].css'
       })
  ]
}