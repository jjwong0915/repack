#!/usr/bin/env node

'use strict';

var path = require('path');
var program = require('commander');
var repack = require('../lib/repack.js');
var execFile = require('child_process').execFile;

var entryFile = '';
var outputFile = '';

program.version('0.0.1')
.description('An easy tool compiles and bundles your React app.')
.arguments('<entry> <output>')
.action((entry, output) => {
    entryFile = entry;
    outputFile = output;
})
.option('-p, --production', 'remove sourcemaps and minimize your scripts')
.option('-v, --verbose', 'output all the information webpack has')
.option('-w, --watch', 'watches all dependencies and recompile on change')
.parse(process.argv);

if(!entryFile || !outputFile) {
    console.error('error: missing required arguments');
    console.log(program.commandHelp());
} else {
    var options = {
        entry: path.resolve(entryFile),
        output: path.resolve(outputFile),
        production: program.production,
    };
    var compiler = repack(options);
    var logging = program.verbose ? 'verbose' : '';
    if(!program.watch) {
        compiler.run().then((stats) => {
            console.log(stats.toString(logging || 'normal'));
        }).catch((err) => {
            console.error(err);
        });
    } else {
        compiler.watch((promise) => {
            promise.then((stats) => {
                console.log(stats.toString(logging || 'minimal'));
            }).catch((err) => {
                console.error(err);
            });
        });
    }
}

module.exports = program;





