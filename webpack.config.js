const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../assets')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new BrowserSyncPlugin({
      files: [`../**/*.php`],
      injectChanges: true,
      proxy: 'http://localhost:8000'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.s[ac]ss$/i,
        use: [{loader: MiniCssExtractPlugin.loader},'css-loader',{loader: "sass-loader", options: {implementation: require("sass")}}]
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map'
};