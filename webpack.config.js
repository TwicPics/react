var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "twicpics.js",
    library: "@twicpics/react",
    libraryTarget: "umd",
    globalObject: "this",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "twicpics.css",
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  externals: {
    react: "react",
  },
};
