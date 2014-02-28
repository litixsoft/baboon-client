'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./example/routes');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'example', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(lessMiddleware({
    src: __dirname + '/example/public',
    compress: true
}));
app.use(express.static(path.join(__dirname, 'example', 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'modules')));
app.use(app.router);
app.use(express.errorHandler());


app.get('/*', routes.index);



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
