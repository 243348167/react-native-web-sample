const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录 */
const appDirectory = path.resolve(__dirname, '../');

module.exports = {
  devtool: 'eval-source-map',//使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
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
          /** 正则表达式，编译所有.js文件 */
          test: /\.js$/,
          /** 包含要编译的目录和文件 */
          include: [
            /** 根目录下的index.js */
            path.resolve(appDirectory, 'index.js'),
            /** 子目录src下所有文件 */
            path.resolve(appDirectory, 'src'),
            path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
          ]
        },
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                       modules: {
                         localIdentName: "[name]__[local]--[hash:base64:5]" // 指定css的类名格式
                       }
                   }
                }, {
                     loader: "postcss-loader"
                }
            ]
        }
    ]
  },
    /**
   * resolve配置模块如何解析
   * */
  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },
    /** 自动解析确定的扩展 */
    extensions: ['.web.js', '.js'],
    /** 告诉webpack解析模块时应搜索的目录 */
    modules: ['node_modules']
  },
  plugins: [
       new webpack.BannerPlugin('版权所有，翻版必究'),
       new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
  ]
}