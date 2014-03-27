'use strict';

angular.module('bbc.session', ['bbc.transport'])
    /**
     * @ngdoc object
     * @name bbc.session.$bbcSession
     * @requires $bbcTransport
     *
     * @description
     * This service allows the client to access the server session.
     * This can be used to tell the session activity of the Single Page the server and to store data in the session.
     *
     * For the store of data, the server session to the client appropriate container for disposal.
     * In this Container, the client can store its data during the session.
     * The client only has access to this container. (Sandbox)
     *
     * For more details see our {@link /session Guide}.
     */
    .factory('$bbcSession', function ($rootScope, $bbcTransport) {
        var pub = {};

        /**
         * @ngdoc method
         * @name bbc.session.$bbcSession#setData
         * @methodOf bbc.session.$bbcSession
         *
         * @description
         * Stores a value under the specified key in the session.
         *
         * @param {string} key The key to the value.
         * @param {*} value The value to be stored.
         * @param {function=} callback The callback function.
         */
        pub.setData = function (key, value, callback) {

            if (arguments.length !== 3) {
                throw new Error('error: Missing parameters, key, value and callback required');
            }

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/setData', {key: key, value: value}, callback);
        };

        /**
         * @ngdoc method
         * @name bbc.session.$bbcSession#deletetData
         * @methodOf bbc.session.$bbcSession
         *
         * @description
         * Delete key/value in the session.
         * If no key is passed, then all key/values is deleted in container.
         *
         * @param {string} [key] The key to the value.
         * @param {function=} callback The callback function.
         */
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

        /**
         * @ngdoc method
         * @name bbc.session.$bbcSession#getData
         * @methodOf bbc.session.$bbcSession
         *
         * @description
         * Get data with key from session.
         * If no key is passed, then read the complete container.
         *
         * @param {string} [key] The key to the value.
         * @param {function=} callback The callback function.
         */
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

        /**
         * @ngdoc method
         * @name bbc.session.$bbcSession#getLastActivity
         * @methodOf bbc.session.$bbcSession
         *
         * @description
         * Get last activity time from session.
         *
         * @param {function=} callback The callback function.
         */
        pub.getLastActivity = function (callback) {

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/getLastActivity', callback);
        };

        /**
         * @ngdoc method
         * @name bbc.session.$bbcSession#setActivity
         * @methodOf bbc.session.$bbcSession
         *
         * @description
         * Set actual time as last activity in session
         *
         * @param {function=} callback The callback function.
         */
        pub.setActivity = function (callback) {

            if (typeof callback !== 'function') {
                throw new Error('error: Parameter callback must be function type');
            }

            $bbcTransport.emit('api/session/setActivity', callback);
        };

        return pub;
    });