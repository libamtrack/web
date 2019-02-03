const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

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

const compresionPlugin = new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    deleteOriginalAssets: true,
    threshold: 10240,
    minRatio: 0.8
});

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
    plugins: [htmlPlugin, copyStatic, compresionPlugin,
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }), ]
};
