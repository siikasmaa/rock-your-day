const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./webpack/config')()
const webpack = require('webpack')

const analyzeBundle = process.env.ANALYZE === 'true'
const isSSR = process.env.SSR === 'true'

const CSSStylesLoader = (options) => [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  {
    loader: 'css-loader',
    options,
  },
]

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'public', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'front-dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].app.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ...config.rules,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
      chunkFilename: 'static/[name].css',
    }),
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: './src/public/index.html',
      },
      {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      },
    ),
    ...(analyzeBundle
      ? new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        })
      : []),
  ],
}
