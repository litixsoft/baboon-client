'use strict';

angular.module('bbc.session', [])
    // Service for session handling
    .factory('bbcSession', function ($rootScope, $log, bbcTransport) {
        var pub = {};

        // save key value in session
        pub.setData = function (key, value, callback) {
            if (arguments.length === 3) {
                bbcTransport.rest('session/setData', {key: key, value: value}, callback);
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

            bbcTransport.rest('session/deleteData', data, callback);
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

            bbcTransport.rest('session/getData', data, callback);
        };

        // check session and set activity time
        pub.getLastActivity = function (callback) {
            bbcTransport.rest('session/getLastActivity', {}, callback);
        };

        // check session and set activity time
        pub.setActivity = function (callback) {
            bbcTransport.rest('session/setActivity', {}, callback);
        };

        return pub;
    });