'use strict';

angular.module('bbc.session', ['bbc.transport'])
    // Service for session handling
    .factory('$bbcSession', function ($rootScope, $log, $bbcTransport) {
        var pub = {};

        // save key value in session
        pub.setData = function (key, value, callback) {

            if (arguments.length !== 3) {
                throw new Error('error: Missing parameters, key, value and callback required');
            }

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/setData', {key: key, value: value}, callback);
        };

        // delete key value in session
        pub.deleteData = function (key, callback) {

            if (arguments.length === 0) {
                throw new Error('error: Missing parameters, callback required');
            }

            var data = {};

            if (arguments.length === 1) {
                callback = key;
                key = null;
            }
            else {
                data = {key: key};
            }

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/deleteData', data, callback);
        };

        // get key value from session
        pub.getData = function (key, callback) {

            if (arguments.length === 0) {
                throw new Error('error: Missing parameters, callback required');
            }

            var data = {};

            if (arguments.length === 1) {
                callback = key;
            }
            else {
                data = {key: key};
            }

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/getData', data, callback);
        };

        // check session and set activity time
        pub.getLastActivity = function (callback) {

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/getLastActivity', callback);
        };

        // check session and set activity time
        pub.setActivity = function (callback) {

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/setActivity', callback);
        };

        return pub;
    });