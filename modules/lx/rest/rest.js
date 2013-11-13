/*global angular*/
angular.module('lx.rest', [])
    .factory('REST', ['$http', function ($http) {
        /**
         * REST
         *
         * @param {string=} url base url for rest api
         */
        return function (url) {
            var pub = {},
                baseUrl = url || '/api/v1/';

            // check baseUrl
            if (typeof baseUrl !== 'string') {
                throw new TypeError('Param "baseUrl" must be of type string!');
            }

            pub.getBaseUrl = function () {
                return baseUrl;
            };

            pub.post = function (route, data, callback) {
                $http.post(baseUrl + route, data).
                    success(function (data) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        var error = {data: data, status: status, headers: headers, config: config};
                        callback(error);
                    });
            };

            pub.get = function (route, callback) {
                $http.get(baseUrl + route).
                    success(function (data) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        var error = {data: data, status: status, headers: headers, config: config};
                        callback(error);
                    });
            };

            pub.put = function (route, data, callback) {
                $http.put(baseUrl + route, data).
                    success(function (data) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        var error = {data: data, status: status, headers: headers, config: config};
                        callback(error);
                    });
            };

            //noinspection ReservedWordAsName
            pub.delete = function (route, callback) {
                $http.put(baseUrl + route).
                    success(function (data) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        var error = {data: data, status: status, headers: headers, config: config};
                        callback(error);
                    });
            };

            return pub;
        };
    }]);
