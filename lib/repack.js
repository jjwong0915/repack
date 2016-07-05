'use strict';

var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var config = (options) => {
    var configs = {
        entry: options.entry,
        output: {
            path: path.dirname(options.output),
            filename: 'bundle.js',
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
        plugins: [
            new webpack.ProvidePlugin({
                React: 'react'
            })
        ]
    };

    if(!options.production) {
        configs.debug = true;
        configs.devtool = 'cheap-module-eval-source-map';
        configs.output.pathinfo = true;
    } else {
        configs.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );
    }

    if(options.progress) {
        configs.plugins.push(new ProgressBarPlugin());
    }

    return configs;
};

var repack = (options) => {
    var compiler = webpack(config(options));
    return {
        run: () => {
            return new Promise((res, rej) => {
                compiler.run((err, stats) => {
                    if(err) rej(err);
                    else res(stats);
                });
            });
        },
        watch: (cb) => {
            return compiler.watch({}, (err, stats) => {
                cb(new Promise((res, rej) => {
                    if(err) rej(err);
                    else res(stats);
                }));
            });
        }
    };
};

module.exports = repack;