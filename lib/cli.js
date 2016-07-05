#!/usr/bin/env node

'use strict';

var program = require('commander');
var repack = require('./repack.js');

var options = {};

program.version('0.0.1')
.arguments('<entry> <output>')
.option('-p, --production', 'remove sourcemap and minimize your scripts')
.option('-v, --verbose', 'output all the information webpack has')
.option('-w, --watch', 'watches all dependencies and recompile on change')
.action((entry, output, program) => {
    options.entry = entry;
    options.output = output;
    options.production = program.production;
    if(!program.watch) options.progress = true;
})
.parse(process.argv);

var logging = '';
if(program.verbose) logging = 'verbose';

if(!program.watch) {
    repack(options).run().then((stats) => {
        console.log(stats.toString(logging || 'normal'));
    }).catch((err) => {
        console.error(err);
    });
} else {
    repack(options).watch((promise) => {
        promise.then((stats) => {
            console.log(stats.toString(logging || 'minimal'));
        }).catch((err) => {
            console.error(err);
        });
    });
}
