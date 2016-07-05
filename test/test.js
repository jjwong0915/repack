'use strict';

var repack = require('../lib/repack');

repack({
    entry: 'app.jsx',
    output: 'bundle.js'
}).run().then((stats) => {
    console.log(stats.toString());
}).catch((err) => {
    console.error(err);
});

