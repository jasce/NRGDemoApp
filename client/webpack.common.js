var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: [ /\.js|jsx$/ ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react','@babel/preset-env'],
            cacheDirectory: true,
          }
        },
      },
      {
        test:/\.(s*)css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ]

};
