/*global angular*/
angular.module('lx.transport', ['lx.rest', 'lx.socket'])
    .factory('lxTransport', ['$rootScope', 'REST', 'SocketIO', 'USE_SOCKET',
        function ($rootScope, REST, SocketIO, USE_SOCKET) {

            // set socket transport to false
            $rootScope.socketEnabled = false;

            // rest default instance
            var rest = new REST();
            var socket;

            // socket.IO default instance
            if (USE_SOCKET) {
                socket = new SocketIO();
            }

            /**
             * Converts the transport callbacks to a standard callback for the application.
             *
             * @example
             *      // schema in application
             *      function(error, data) {});
             *
             * @param {!object} data - Transport data object.
             * @param {function(?object, ?object=)} callback - The callback from application.
             */
            function transportCallback(data, callback) {
                $rootScope.isLoading = false;

                if (data.error) {
                    callback(data.error);
                } else {
                    // check data null or undefined and create error
                    if (typeof data.data === 'undefined' || data.data === null) {
                        callback('transport error: return data is undefined or null');
                    } else {
                        callback(null, data.data);
                    }
                }
            }

            return {
                /**
                 * Emits transport fire event to socket or request post to server.
                 * Rest route is socket event name + baseUrl.
                 *
                 * @param {!string} event The socket and rest event route.
                 * @param {!(object|function)} data The data object for server or the callback.
                 * @param {function=} callback The callback.
                 */
                emit: function (event, data, callback) {
                    // 2 arguments, must be a {string} event and {function} callback
                    if (arguments.length === 2) {
                        // callback is in data
                        callback = data;

                        // create empty data object
                        data = {};
                    }

                    // check event
                    if (typeof event !== 'string' || event.length === 0) {
                        throw new TypeError('Param "event" is required and must be of type string!');
                    }

                    // check callback
                    if (typeof callback !== 'function') {
                        throw new TypeError('Param "callback" is required and must be of type function!');
                    }

                    // check data
                    if (typeof data !== 'object') {
                        throw new TypeError('Param "data" parameter must be of type object!');
                    }

                    $rootScope.isLoading = true;

                    // check if socket is enabled and use rest or socket for transport
                    if ($rootScope.socketEnabled) {
                        // use socket for transport
                        socket.emit(event, data, function (data) {
                            transportCallback(data, function () {
                                var args = arguments;

                                $rootScope.$apply(function () {
                                    if (callback) {
                                        callback.apply(socket, args);
                                    }
                                });
                            });
                        });
                    } else {
                        // use rest post for transport
                        rest.post(event, data, function (data) {
                            transportCallback(data, callback);
                        });
                    }
                },
                /**
                 * Rest transport post request to server.
                 * Rest route is socket event name + baseUrl.
                 *
                 * @param {!string} event The socket and rest event route.
                 * @param {!(object|function)} data The data object for server or the callback.
                 * @param {function=} callback The callback.
                 */
                rest: function (event, data, callback) {
                    // 2 arguments, must be a {string} event and {function} callback
                    if (arguments.length === 2) {
                        // callback is in data
                        callback = data;

                        // create empty data object
                        data = {};
                    }

                    // check event
                    if (typeof event !== 'string' || event.length === 0) {
                        throw new TypeError('Param "event" is required and must be of type string!');
                    }

                    // check callback
                    if (typeof callback !== 'function') {
                        throw new TypeError('Param "callback" is required and must be of type function!');
                    }

                    // check data
                    if (typeof data !== 'object') {
                        throw new TypeError('Param "data" parameter must be of type object!');
                    }

                    $rootScope.isLoading = true;

                    // use rest post for transport
                    rest.post(event, data, function (data) {
                        transportCallback(data, callback);
                    });
                }
            };
        }]);