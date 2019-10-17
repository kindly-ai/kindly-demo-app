'use strict';
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  entry: [path.join(__dirname, 'main.js')],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new Dotenv({
      path: path.join(__dirname, '..', '.env'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};

module.exports = function(env) {
  if (env) {
    return merge(require(`./webpack.${env}.js`), common);
  } else {
    return common;
  }
};
