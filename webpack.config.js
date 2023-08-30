const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./demo/src/index.tsx",
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "index-[hash].js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `./demo/public/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css?[hash]",
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
        splitChunks: {
            name: "vendor",
            filename: "./vendor-[hash].js",
            chunks: "all",
        },
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(t|j)sx?$/,
                use: { loader: "ts-loader" },
                exclude: /node_modules/,
            },
            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["@babel/preset-env"],
            //             plugins: ["@babel/plugin-transform-runtime"],
            //         },
            //     },
            // },
        ],
    },
};
