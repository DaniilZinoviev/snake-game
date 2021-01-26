const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.default = ({ mode }) => {

  return {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      })
    ],
    devServer: {
      open: true
    }
  }
}