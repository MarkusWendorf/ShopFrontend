const webpack = require("webpack");

const config = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/dist",
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".css", ".scss"]
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
    }
};

module.exports = config;
