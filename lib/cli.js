#!/usr/bin/env node

'use strict';

var program = require('commander');
var repack = require('./repack.js');

var entry;
var output;

program.version('0.0.1')
.arguments('<entry> <output>')
.action((arg1, arg2) => {
    entry = arg1;
    output = arg2;
})
.option('-w, --watch', 'Watches all dependencies and recompile on change')
.parse(process.argv);

if(!program.watch) {
    repack(entry, output).run().then((stats) => {
        console.log(stats.toString('normal'));
    }).catch((err) => {
        console.error(err);
    });
} else {
    repack(entry, output).watch((err, stats) => {
        if(err) console.error(err);
        else console.log(stats.toString('minimal'));
    });
}
