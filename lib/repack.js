'use strict';

var path = require('path');
var webpack = require('webpack');
var ora = require('ora');

var config = (options) => {

    var spinner = ora().start();

    var configs = {
        entry: options.entry,
        output: {
            path: path.dirname(options.output),
            filename: path.basename(options.output)
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: [
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-es2015')
                    ],
                }
            }]
        },
        resolve: {
            root: path.resolve(__dirname, '..', 'node_modules'),
            extensions: ['', '.js', '.jsx'],
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: 'react'
            }),
            new webpack.ProgressPlugin((percent, msg) => {
                spinner.text = msg;
                spinner.render();
                if(percent == 1) {
                    spinner.stop();
                }
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

    return configs;
};

var repack = (options) => {
    return {
        run: () => {
            return new Promise((res, rej) => {
                webpack(config(options)).run((err, stats) => {
                    if(err) rej(err);
                    else res(stats);
                });
            });
        },
        watch: (handler) => {
            handler = handler || new Function;
            return new Promise((res) => {
                res(webpack(config(options)).watch({}, (err, stats) => {
                    handler(new Promise((res, rej) => {
                        if(err) rej(err);
                        else res(stats);
                    }));
                }))
            });
        }
    };
};

module.exports = repack;
