'use strict';

var resolve = require('path').resolve;
var assert = require('chai').assert;
var execFile = require('child_process').execFile;

describe('CLI', () => {
    var cli = resolve(__dirname, '..', 'bin', 'repack.js');
    describe('repack', () => {
        it('should output error when no arguments', (done) => {
            execFile(cli, (err, stdout, stderr) => {
                if(err) throw err;
                assert.include(stderr, 'error');
                done();
            });
        });
        it('should output usage with "-h"', (done) => {
            execFile(cli, ['-h'], (err, stdout) => {
                if(err) throw err;
                assert.include(stdout, 'Usage');
                done();
            });
        });
    });
});
