'use strict';

angular.module('bbc.session', [])
    // Service for session handling
    .factory('bbcSession', function ($rootScope, $log, transport) {
        var pub = {};

        // save key value in session
        pub.setData = function (key, value, callback) {
            if (arguments.length === 3) {
                transport.emit('api/session/setData', {key: key, value: value}, callback);
            }
            else {
                $log.error('parameter error, required key, value and callback');
            }
        };

        // delete key value in session
        pub.deleteData = function (key, callback) {
            var data = {};

            if (arguments.length === 1) {
                callback = key;
                key = null;
            }
            else {
                data = {key: key};
            }

            transport.emit('api/session/deleteData', data, callback);
        };

        // get key value from session
        pub.getData = function (key, callback) {
            var data = {};

            if (arguments.length === 1) {
                callback = key;
            }
            else {
                data = {key: key};
            }

            transport.emit('api/session/getData', data, callback);
        };

        // check session and set activity time
        pub.getLastActivity = function (callback) {
            transport.emit('api/session/getLastActivity', {}, callback);
        };

        // check session and set activity time
        pub.setActivity = function (callback) {
            transport.emit('api/session/setActivity', {}, callback);
        };

        return pub;
    });