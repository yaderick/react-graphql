const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const makePath = require('./utils');

const config = {
  entry: {
    app: makePath('src/universal/index.jsx')
  },
  output: {
    filename: '[name].[hash:16].bundle.js',
    chunkFilename:'[name].[chunkhash].chunk.js',
    path: makePath('dist'),
    publicPath:'/',
    libraryTarget: 'umd',
  },
  module:{
    rules:[
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'file-loader' }
        ]
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: true
          }
        }]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'file-loader' }
        ]
      }, {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      }, {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }, {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          makePath('./src/universal')
        ],
        use: [{
            loader: "babel-loader",
            options: { presets: ["es2015", "react", "stage-0"], cacheDirectory: true, }
        }],
      }, {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        include: [
          makePath('./src/universal')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: makePath('./src/universal/index.html'),
      title: 'Rise Online',
      inject: true,
      favicon: makePath('./src/universal/assets/fac.ico')
    }),
  ],
  resolve:{
    alias:{ '@': makePath('./src/universal') },
    extensions: ['.js', '.jsx', '.less', '.css', '.json', '.gql', '.graphql'],
    modules: [makePath('./src/universal'), 'node_modules']
  },
  externals:{
    //cdn接口
  }
}

module.exports = config;
