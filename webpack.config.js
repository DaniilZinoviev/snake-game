const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.default = ({ mode }) => {

  return {
    mode: 'development',
    module: {
      rules: [
        // Scripts
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },

        // Styles
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
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