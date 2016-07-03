'use strict';

var path = require('path');
var webpack = require('webpack');

var config = (entry, output) => ({
    entry: entry,
    output: {
        path: path.dirname(output),
        filename: 'bundle.js',
        pathinfo: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    resolve: {
        root: process.cwd(),
        extensions: ['', '.js', '.jsx']
    },
    debug: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ]
});

var repack = (entry, output) => {
    var compiler = webpack(config(entry, output));
    return {
        run: () => {
            return new Promise((res, rej) => {
                compiler.run((err, stats) => {
                    if(err) rej(err);
                    else res(stats);
                });
            });
        },
        watch: (handler) => {
            return Promise.resolve(compiler.watch({}, handler));
        }
    };
};

module.exports = repack;