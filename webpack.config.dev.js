const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const dotEnvWebpack = require('dotenv-webpack');
//const bundlerAnalyzer = require('webpack-bundle-analyzer');


module.exports = {
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development', //npx webpack --mode development
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@templates':path.resolve(__dirname, 'src/templates/'),
            '@utils':path.resolve(__dirname, 'src/utils/'),
        }
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
       new dotEnvWebpack(),
       //new bundlerAnalyzer(),
    ],
    devServer: {
        open: true,
        static: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3006,
		open: true,
    },
};

