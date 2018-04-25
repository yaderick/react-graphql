const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const makePath = require('./utils');

const config = {
  mode: 'development',
  devServer: {
    contentBase: makePath('./dist'),
    compress: true,
    historyApiFallback: true,
    port: 9090,
    open: true,
    // inline:false, //开启iframe
    hot: true,
    overlay: true,
    noInfo:false, //开启打包信息
    proxy: {
      '/graphql': {
        target: 'http://117.50.12.51',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/graphql': '/graphql'
        }
      }
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: [ { loader: "eslint-loader" },],
        include: makePath('src/universal')
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: false, //开启css modules 模式
              localIdentName: '[name]__[local]--[hash:base64:5]',
              getLocalIdent: (context, localIdentName, localName, options) => {
                return 'whatever_random_class_name'
              },
              camelCase: true,
              sourceMap: true,
            }
          }
        ]
      },
    ],
  },
}

module.exports = webpackMerge(webpackCommon, config);
