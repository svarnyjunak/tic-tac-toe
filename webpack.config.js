module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        publicPath: '/dist',
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
        ]
    }
};