const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "webpack-hot-middleware/client", "webpack/hot/dev-server"],
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader/webpack", "babel-loader"]
      }
    ]
  }
};
