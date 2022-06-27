const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: "bundle.js"
    },
    devServer: {
        allowedHosts: ['.gitpod.io', 'github.io'],
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/static" , to : "static"},
                { from: "src/libat.wasm"},
            ]
        }),
        new BundleAnalyzerPlugin({"openAnalyzer":false, "analyzerMode":"static"})
    ]
};