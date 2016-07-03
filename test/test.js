'use strict';

var repack = require('../lib/repack');

repack('app.jsx', 'bundle.js').run().then((stats) => {
    console.log(stats.toString());
}).catch((err) => {
    console.error(err);
});

// repack('app.jsx', 'bundle.js').watch((err, stats) => {
//     if(err) console.error(err);
//     else console.log(stats.toString('minimal'));
// });