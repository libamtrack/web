const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var Visualizer = require('webpack-visualizer-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const copyStatic = new CopyWebpackPlugin([
    {
        from: 'src/static/',
        to: "static/"
    }
]);
const copyWasm = new CopyWebpackPlugin([
    {
        from: 'src/libat.wasm',
        to: ""
    }
]);

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    node: {
        fs: 'empty'
    },
    target: 'web',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
        ]
    },
    plugins: [htmlPlugin, copyStatic, copyWasm, new BundleAnalyzerPlugin({"openAnalyzer":false}),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }), new Visualizer()]
};