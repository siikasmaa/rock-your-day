const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const config = require('./webpack/config')()

const analyzeBundle = process.env.ANALYZE === 'true'

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src'),
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ...config.rules
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
      chunkFilename: 'static/[name].css'
    }),
    ...(analyzeBundle
      ? new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        })
      : [])
  ]
}
