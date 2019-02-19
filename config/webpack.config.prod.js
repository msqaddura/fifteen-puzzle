var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var webpack = require("webpack");
var fs = require("fs");
module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      webgladiator: path.resolve(
        __dirname,
        "../",
        "submodules/WebGLadiator/src"
      )
    },
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: "config/tsconfig.prod.json"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", { root: path.resolve(__dirname, "../") }),
    new CopyWebpackPlugin([
      { from: "src/Resources", to: "Resources/" },
      { from: "src/static/index.html", to: "index.html" },
      { from: "src/static/favicon.ico", to: "favicon.ico" }
    ])
  ]
};
