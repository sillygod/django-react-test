var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    context: __dirname,
    entry: {
        index: './assets/js/index'
    },
    output: {
        path: path.resolve("./assets/bundles/"),
        filename: "[name].js",
        publicPath: "/static/bundles/"
    },

    plugins: [
        new BundleTracker({
            filename: "./webpack.stats.json"
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query:
                {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },

    resolve: {
        modulesDirectories: ["node_modules", "bower_components"],
        extensions: ["", ".js", ".jsx"],
    }
}