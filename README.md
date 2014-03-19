# baboon client [![Build Status](https://img.shields.io/travis/litixsoft/baboon-client/v0.4.svg)](https://travis-ci.org/litixsoft/baboon-client) [![david-dm](https://david-dm.org/litixsoft/baboon-client.png)](https://david-dm.org/litixsoft/baboon-client/) [![david-dm](https://david-dm.org/litixsoft/baboon-client/dev-status.png)](https://david-dm.org/litixsoft/baboon-client#info=devDependencies&view=table)

> A client library for baboon webtoolkit.

## Install
install global dependencies:

    $ npm install -g bower

Usual baboon-client standard installation over bower registry:

    $ bower install baboon-client

[Learn more about usage of Bower](https://github.com/bower/bower#usage)

**Special installations on GitHub**

Github: master, current development status, release candidate:

	$ bower install https://github.com/litixsoft/baboon-client.git#master

Github: v0.4, very early stage of development, unstable:

	$ bower install https://github.com/litixsoft/baboon-client.git#v0.4


## Contributing and test
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Please create descriptive commit messages.
We use a git hook to validate the commit messages against these [rules](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w).
Lint and test your code using [grunt](http://gruntjs.com/).

Install global dependencies:

    $ npm install -g grunt-cli karma bower

On linux use administrative rights to install global modules:

    $ sudo npm install -g grunt-cli karma bower

Clone the baboon-client repository and install the dev dependencies and test suite deps.
Test baboon-client with grunt.

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ npm install
    $ bower install
    $ grunt test

Alternate you can use the update script

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ ./update.sh // in windows use update.bat
    $ grunt test


Help us with your ideas. Write your code and test it.
Write tests for your code. All tests must be successful. Make a pull request.

## Author
[Litixsoft GmbH](http://www.litixsoft.de)

## License

Copyright (C) 2013-2014 Litixsoft GmbH info@litixsoft.de Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
