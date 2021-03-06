const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        about: './src/about/index.js',
        analytics: './src/analytics/index.js'
    }, //путь до входного файла
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/, 
                use: { loader: "babel-loader" },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:  [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../', } 
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        importLoaders: 2
                        }
                    }, 
                    'postcss-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: { 
                    loader: "file-loader", 
                    options: {
                        name: "./vendor/[name].[ext]"
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                use: [
                    { 
                        loader: "file-loader", 
                        options: {
                            name: "./images/[name].[ext]",
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
          inject: false,
          chunks: ['main'],
          template: './src/index.html', //путь до файла html
          filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['about'],
            template: './src/about.html', //путь до файла html
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['analytics'],
            template: './src/analytics.html', //путь до файла html
            filename: 'analytics.html'
        }),
        new WebpackMd5Hash()
      ]
}