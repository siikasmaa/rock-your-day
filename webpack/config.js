const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  const CSSStylesLoader = (options) => [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options,
    },
  ]

  return {
    rules: [
      {
        test: /\.(css|scss)(\?.*)?$/,
        include: [path.resolve(__dirname, './src/')],
        use: [
          ...CSSStylesLoader({
            url: false,
            modules: {
              mode: 'local',
              localIdentName: '[hash:base64:8]',
            },
          }),
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(css|scss)(\?.*)?$/,
        exclude: [path.resolve(__dirname, './src/')],
        use: [...CSSStylesLoader()],
      },
      {
        test: /\.(css|scss)(\?.*)?$/,
        exclude: [path.resolve(__dirname, './src/')],
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  }
}
