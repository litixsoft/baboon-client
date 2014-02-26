/*global angular*/
angular.module('lx.session', [])
    // Service for session handling
    .factory('lxSession', ['$rootScope', '$log', 'lxTransport', function ($rootScope, $log, transport) {
        var pub = {};

        // save key value in session
        pub.setData = function (key, value, callback) {
            if (arguments.length === 3) {
                transport.rest('session/setData', {key: key, value: value}, callback);
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

            transport.rest('session/deleteData', data, callback);
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

            transport.rest('session/getData', data, callback);
        };

        // check session and set activity time
        pub.getLastActivity = function (callback) {
            transport.rest('session/getLastActivity', {}, callback);
        };

        // check session and set activity time
        pub.setActivity = function (callback) {
            transport.rest('session/setActivity', {}, callback);
        };

        return pub;
    }]);