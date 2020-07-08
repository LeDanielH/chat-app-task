const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const prod = process.argv.indexOf('-p') !== -1;
const path = require('path');

const webpackConfig = {
    entry: path.join(__dirname, '/client/app.tsx'),
    output: {
        path: path.join(__dirname, '/server'),
        filename: '[name].js',
        library: 'app',
        libraryTarget: 'window',
		publicPath: '/',
    },

    devtool: prod ? "source-map" : "eval-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules|Generated|dist|server)/
            },
        ]
    },
    devServer: {
        open: true,
        overlay: true,
        port: 9876,
        clientLogLevel: "warning",
        historyApiFallback: true,
        inline: true,
        hot: true,
        contentBase: './client',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
			inlineSource: '.(js|css)$',
        }),
		new HtmlWebpackInlineSourcePlugin(),
    ]
};

module.exports = webpackConfig;
