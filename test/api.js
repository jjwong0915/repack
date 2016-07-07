'use strict';

var assert = require('chai').assert;
var repack = require('../lib/repack.js');

describe('Node.js API', () => {
    describe('repack(config)', () => {
        var compiler = repack();
        describe('.run()', () => {
            it('should return a Promise', () => {
                var result = compiler.run();
                assert.instanceOf(result, Promise);
            });
        });
        describe('.watch(cb)', () => {
            it('should return a Promise', () => {
                var result = compiler.watch();
                assert.instanceOf(result, Promise);
            });
            it('should callback with a Promise', (done) => {
                compiler.watch((result) => {
                    assert.instanceOf(result, Promise);
                    done();
                });
            });
        });
    });
});




