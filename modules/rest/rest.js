'use strict';

angular.module('bbc.rest', [])
    .factory('bbcRest', function ($http) {

        var pub = {};

        /**
         * Post request
         *
         * @example
         *
         *  rest.post('/api/getUser', {user_id:22}, function(error, user) {
         *      if (!error && user) {
         *          console.log(user.name);
         *      }
         *  });
         *
         * @param {string} route
         * @param {Object} data
         * @param {{Function(error, data, [status], [headers], [config] )}} callback
         * @param {Object} [config]
         */
        pub.post = function (route, data, callback, config) {

            config = config || {};

            $http.post(route, data, config)
                .success(function (data, status, headers, config) {
                    callback(null, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    callback({data: data, status: status, headers: headers, config: config});
                });
        };

        /**
         * Get request
         *
         * @example
         *
         *  rest.get('/api/getAll', function(error, users) {
         *      if (!error && users) {
         *          console.log(users[0].name);
         *          console.log(users[1].name);
         *      }
         *  });
         *
         * @param {string} route
         * @param {{Function(error, data, [status], [headers], [config] )}} callback
         * @param {Object} [config]
         */
        pub.get = function (route, callback, config) {

            config = config || {};

            $http.get(route, config)
                .success(function (data, status, headers, config) {
                    callback(null, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    callback({data: data, status: status, headers: headers, config: config});
                });
        };

        /**
         * Put request
         *
         * @example
         *
         *  rest.put('/api/users/addUser', {name:'testUser'}, function(error, id) {
         *
         *      if (!error && id) {
         *          console.log(id);
         *      }
         *  });
         *
         * @param {string} route
         * @param {Object} data
         * @param {{Function(error, data, [status], [headers], [config] )}} callback
         * @param {Object} [config]
         */
        pub.put = function (route, data, callback, config) {

            config = config || {};

            $http.put(route, data, config)
                .success(function (data, status, headers, config) {
                    callback(null, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    callback({data: data, status: status, headers: headers, config: config});
                });
        };

        //noinspection ReservedWordAsName

        /**
         * Delete request
         *
         * @example
         *
         *  rest.delete('/api/delete/user/22', function(error, result) {
         *
         *      if (!error && result) {
         *          console.log(result);
         *      }
         *  });
         *
         * @param {string} route
         * @param {{Function(error, data, [status], [headers], [config] )}} callback
         * @param {Object} [config]
         */
        pub.delete = function (route, callback, config) {
            $http.delete(route, config)
                .success(function (data, status, headers, config) {
                    callback(null, data, status, headers, config);
                })
                .error(function (data, status, headers, config) {
                    var error = {data: data, status: status, headers: headers, config: config};
                    callback(error);
                });
        };

        return pub;
    });