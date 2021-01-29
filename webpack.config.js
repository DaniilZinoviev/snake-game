const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.default = ({ mode }) => {

  return {
    entry: {
      game: './src/game.js',
      demo: './src/demo.js'
    },
    devtool: 'inline-source-map',
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist'
    },
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