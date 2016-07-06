#!/usr/bin/env node

'use strict';

var program = require('commander');
var repack = require('./repack.js');
var execFile = require('child_process').execFile;

var options = {};

program.version('0.0.1')
.description('React developing tool built with Webpack.')
.arguments('<entry> <output>')
.option('-p, --production', 'remove sourcemap and minimize your scripts')
.option('-v, --verbose', 'output all the information webpack has')
.option('-w, --watch', 'watches all dependencies and recompile on change')
.action((entry, output, program) => {
    options.entry = entry;
    options.output = output;
    options.production = program.production;
    options.program = !program.watch;
}).parse(process.argv);

if(!options.entry || !options.output) {
    console.error('error: missing required arguments');
    execFile(__filename, ['--help'], (err, stdout) => {
        if(err) console.error(err);
        else console.log(stdout);
    });
} else {
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


