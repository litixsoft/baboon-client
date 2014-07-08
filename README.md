# baboon client
> Baboon-Client is a client library for [baboon webtoolkit](https://github.com/litixsoft/baboon). It also has different directives to simplify tasks in client web development.

> [![Bower version](https://badge.fury.io/bo/baboon-client.svg)](http://badge.fury.io/bo/baboon-client)
[![Build Status](https://secure.travis-ci.org/litixsoft/baboon-client.svg?branch=master)](https://travis-ci.org/litixsoft/baboon-client)
[![david-dm](https://david-dm.org/litixsoft/baboon-client.svg?theme=shields.io)](https://david-dm.org/litixsoft/baboon-client/)
[![david-dm](https://david-dm.org/litixsoft/baboon-client/dev-status.svg?theme=shields.io)](https://david-dm.org/litixsoft/baboon-client#info=devDependencies&view=table)

* Website: http://www.litixsoft.de/baboon-client
* API Documentation: http://www.litixsoft.de/baboon-client/api
* Developer Guide: http://www.litixsoft.de/baboon-client/guide

# Install
The installation of Baboon-Client is very simple. However, some preparatory work is needed.

## Global dependencies:

Linux / Mac:

    $ sudo npm install -g bower

Windows:

    $ npm install -g bower

## Create and start your Baboon-Client project
Usual baboon-client standard installation over bower registry:

    $ bower install baboon-client

[Learn more about usage of Bower](https://github.com/bower/bower#usage)

# Contributing
Instead of us handing out a formal style guide, simply stick to the existing programming style. Please create descriptive commit messages.
We use a git hook to validate the commit messages against these [rules](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w).
Easily expand Baboon-Client with your own extensions or changes in the functionality of Baboon-Client itself. Use this workflow:

1. Write your functionality
2. Write unit tests for your functionality
3. Create an example of your functionality in the guide
4. Document your functionality in the documentation section of the guide
5. All tests should be successful
6. Check your test coverage (90 - 100%)
7. Make a pull request

We will check the tests, the example and test coverage. In case your changes are useful and well tested, we will merge your requests.

# Building and Testing Baboon-Client
This section describes how to set up your development environment to build and test Baboon-Client with the guide.

## Global dependencies:

Linux / Mac:

    $ sudo npm install -g grunt-cli karma bower

Windows:

    $ npm install -g grunt-cli karma bower


## Clone Baboon-Client and guide
The guide is also the reference implementation for Baboon-Client.
Clone Baboon-Client repository and install the dependent modules with npm and bower.

Clone the baboon-client repository and install the dev dependencies and test suite deps.
Test baboon-client with grunt.

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ npm install
    $ bower install

Alternate you can use the update script:

    $ git clone https://github.com/litixsoft/baboon-client.git
    $ cd baboon-client
    $ ./update.sh // in windows use update.bat

## Running tests
You can run all unit tests for Baboon-Client with:

    $ grunt test // directory baboon-client

## Running coverage
You can run a coverage task for Baboon-Client with:

    $ grunt cover // directory baboon-client

## Running tests for ci systems
You can run unit tests, jshint and code coverage for ci systems with:

    $ grunt ci

## Generate Documentation
You can generate the documentation for baboon-client with:

    $ grunt doc

## Running guide and documentation
You can start the node application and run the guide under http://localhost:3000.

    $ node server.js

# Author
[Litixsoft GmbH](http://www.litixsoft.de)

# License
Copyright (C) 2013-2014 Litixsoft GmbH <info@litixsoft.de>
Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. DEALINGS IN THE SOFTWARE.
