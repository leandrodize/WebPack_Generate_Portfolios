const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css|.styl$/i,
                use: [
                    cssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: "[name].[ext]",
                        outputPath: './dist/assets/fonts',
                        publicPath: './dist/assets/fonts',
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
       new htmlWebpackPlugin ({
           inject : true,
           template: './public/index.html',
           filename: './index.html',
       }),
       new cssExtractPlugin (),
       new copyWebpackPlugin ({
           patterns: [
               {
                   from: path.resolve(__dirname, 'src', 'assets/images'),
                   to: 'assets/images'
               },
               {
                   from: path.resolve(__dirname, 'src', 'assets/fonts'),
                   to: 'assets/fonts'
               }
           ]
       }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizerPlugin(),
            new terserPlugin(),
        ]
    }
};

