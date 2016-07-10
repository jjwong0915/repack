Repack
====
:package: An easy tool compiles and bundles your React app :package:


Feature
----
* Bundle whole application into one JavaScript file
* Make your JSX and ES2015 scripts work in browser
* No need for any extra configuraions


Getting Started
----
1. Install `repack` as a global command with [npm](https://www.npmjs.com/),

    ```sh
    $ sudo npm install -g @jjwong0915/repack
    ```

    or a project dependency if you wan't to use the API.

    ```sh
    $ npm install --save @jjwong0915/repack
    ```


2. Create two files `helloWorld.html` and `reactApp.jsx`.

    helloWorld.html:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Hello Repack</title>
    </head>
    <body>
        <div id="container"></div>
        <script src="bundle.js"></script>
    </body>
    </html>
    ```

    reactApp.jsx:

    ```js
    import reactDOM from 'react-dom'; // ES6 Syntax

    reactDOM.render(
        <h1>Hello World!</h1>,        // JSX Syntax
        document.getElementById('container')
    );
    ```

3. Compile and bundle `reactApp.jsx` into `bundle.js` with `repack`.

    ```sh
    $ repack reactApp.jsx bundle.js
    ```

4. Open `helloWorld.html` with your browser and see the magic works.


CLI Usage
----

    Usage: repack [options] <entry> <output>

    React developing tool built with Webpack.

    Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -p, --production  remove sourcemaps and minimize your scripts
    -v, --verbose     output all the information webpack has
    -w, --watch       watches all dependencies and recompile on change


Node.js API
----
* Import the `repack` API by

    ```node
    const repack = require('@jjwong0915/repack');
    ```


* Function `repack(config) => compiler`
    * Object `config {entry, output, production}`
        * String `entry`: The entry point for the bundle. (Required)
        * String `output`: The file path to output the bundle. (Required)
        * Boolean `production`: Switch to production mode. (Default: `false`)
    * Object `compiler {run, watch}`
        * Function `run() => result`
            * Promises `result`: fullfilled with [stats](http://webpack.github.io/docs/node.js-api.html#stats) when completed.
        * Function `watch(handler) => progress`
            * Function `handler(result)`: called after a build has been executed. (Optional)
                * Promise `result`: fullfilled with [stats](http://webpack.github.io/docs/node.js-api.html#stats) when completed.
            * Promise `progress`: fullfilled with [watcher](http://webpack.github.io/docs/node.js-api.html#watching) when no error.


Built With
----
* [Webpack](http://webpack.github.io/)
* [Babel](https://babeljs.io/)


Contributing
----
* Running the tests with `npm test`
* Report bugs with [github issues](https://github.com/jjwong0915/repack/issues)
* New ideas about the project are welcome!!!


License
----
[ISC License](https://raw.githubusercontent.com/jjwong0915/repack/master/LICENSE)
