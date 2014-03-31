# baboon client [![Build Status](https://travis-ci.org/litixsoft/baboon-client.svg?branch=master)](https://travis-ci.org/litixsoft/baboon-client) [![david-dm](https://david-dm.org/litixsoft/baboon-client.png)](https://david-dm.org/litixsoft/baboon-client/) [![david-dm](https://david-dm.org/litixsoft/baboon-client/dev-status.png)](https://david-dm.org/litixsoft/baboon-client#info=devDependencies&view=table)

> A client library for baboon webtoolkit.

## Install
Install global dependencies:

    $ npm install -g bower

Usual baboon-client standard installation over bower registry:

    $ bower install baboon-client

[Learn more about usage of Bower](https://github.com/bower/bower#usage)

**Special installations on GitHub**

Github: master, current development status, release candidate:

	$ bower install https://github.com/litixsoft/baboon-client.git#master

Github: develop, very early stage of development, unstable:

	$ bower install https://github.com/litixsoft/baboon-client.git#develop


## Contributing and test
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

install global dependencies:

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

Help us with your ideas. Write your code and test it.
Write tests for your code. All tests must be successful. Make a pull request.

## Release History
### v0.3.2
* fix logging to console in lx.alert when type is 'error'

### v0.3.1
* add directive lxReset (adds a x-Button to clear an input)
* fix error in lxDatepicker directive
* change type 'error' to 'danger' in lxAlert to match new bootstrap v3.0.0 css classes
* add new param buttonTextValues to lxModal when opening a new modal window to override the text values of the buttons
* update angular to v1.2.12

### v0.3.0
* add function transport.on() to listen to socket events
* add lxDatepicker directive
* add lx-radio and lx-checkbox directives to have radio buttons and checkboxes that looks the same in every browser and OS
* highlight the active link in the menu
* make menu responsive
* fix error in lx.pager that button 'next Page' and 'last Page' are enabled when current page is greater than number of pages
* navigation now uses names instead of numbers to find children

### v0.2.9
* update angular to v1.2.2
* update angular-translate to v1.1.1
* add transport.rest() to make rest only calls over the transport layer
* update navigation and session to use transport.rest()
* add .jshintrc

### v0.2.8
* update api/v1
* remove auth

### v0.2.7
* remove passport auth

### v0.2.6
* integrate charts
* update design
* update auth
* bugfixes
* refactoring

### v0.2.5
* sync with baboon actual version

### v0.0.2
* include and rename module
* tests

### v0.0.1
* initial structure

## Author
[Litixsoft GmbH](http://www.litixsoft.de)

## License

Copyright (C) 2013-2014 Litixsoft GmbH info@litixsoft.de Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
