'use strict';

angular.module('bbc.transport', ['btford.socket-io'])
    .factory('Socket', function (socketFactory) {
        return function (host, timeout) {
            return socketFactory({
                ioSocket: io.connect(host, {'connect timeout': timeout})
            });
        };
    })
    .provider('transport', function () {

        var config = {};

        /**
         * Setup the transport configuration
         *
         * @param {Object} [options]
         */
        this.set = function (options) {

            options = options || {};

            // default settings
            config.protocol = options.protocol;
            config.hostname = options.hostname;
            config.port = options.port;

            if(options.hasOwnProperty('useSocket')) {
                config.useSocket = options.useSocket;
            }
            else {
                config.useSocket = true;
            }

            config.connectTimeout = options.connectTimeout || 5000;

        };

        /**
         * Get instance of transport
         *
         * @param $rootScope
         * @param $http
         * @param Socket
         * @param $window
         * @param $log
         * @returns {{forward: forward, on: on, addListener: addListener, removeListener: removeListener, emit: emit}}
         */
        this.$get = function ($rootScope, $http, Socket, $window, $log) {

            var socket;

            // default settings when options is empty
            config.protocol = config.protocol || $window.location.protocol;
            config.hostname = config.hostname || $window.location.hostname;
            config.port = config.port || parseInt($window.location.port);

            // fix protocol when forgotten :
            if(config.protocol === 'http' || config.protocol === 'https' ||
                config.protocol === 'ws' || config.protocol === 'wss') {
                config.protocol = config.protocol + ':';
            }

            // create the host url
            config.host = config.protocol + '//' + config.hostname + ':' + config.port;

            // default socket is not enabled
            $rootScope.socketEnabled = false;

            /**
             * Register socket events
             *
             * @param socket
             */
            var registerSocketEvents = function(socket) {

                // socket connect event, change transportSocket to true.
                socket.on('connecting', function () {
                    $log.info('socket: connecting to ', config.host);
                });

                // socket connect event, change transportSocket to true.
                socket.on('connect', function () {
                    $log.info('socket: connected');
                    $rootScope.socketEnabled = true;
                });

                // socket disconnect event, change transportSocket to false.
                socket.on('disconnect', function () {
                    $log.warn('socket: disconnected');
                    $rootScope.socketEnabled = false;
                });

                // socket error event
                socket.on('error', function () {
                    $log.warn('socket: error');
                    $rootScope.socketEnabled = false;
                });
            };

            // check useSocket
            if(config.useSocket) {

                // create socket instance
                socket = new Socket(config.host, config.timeout);

                // register events
                registerSocketEvents(socket);
            }

            /**
             * Emit transport fire event to socket or request post to server.
             * Rest route is socket event name.
             *
             * @param {!string} event - The socket and rest event route.
             * @param {!(object|function)} data - The data object for server.
             * @param {function=} callback - The callback.
             */
            var emit = function(event, data, callback) {

                // when 2 is callback in data, rewrite this
                if(arguments.length === 2) {
                    callback = data;
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

                if (config.useSocket && $rootScope.socketEnabled) {
                    socket.emit(event, data, function(error, result){
                        $rootScope.isLoading = false;

                        var err = null;
                        if (error){
                            err = {data: error};
                        }
                        callback(err, result);
                    });
                }
                else {
                    $http.post(event, data)
                        .success(function (result) {
                            $rootScope.isLoading = false;
                            callback(null, result);
                        })
                        .error(function (data, status, headers, config) {
                            var error = {data: data, status: status, headers: headers, config: config};
                            $rootScope.isLoading = false;
                            callback(error);
                        });
                }
            };

            /**
             * Forward events to angular
             *
             * @param event
             * @param scope
             * @returns {*|void}
             */
            var forward = function(event, scope) {
                if (config.useSocket) {
                    return socket.forward(event, scope);
                }
            };

            /**
             * Register events on socket
             *
             * @param event
             * @param callback
             * @returns {*}
             */
            var on = function(event, callback) {
                if (config.useSocket) {
                    return socket.on(event, callback);
                }
            };

            /**
             *
             * Add listener on socket
             * The same as on.
             *
             * @param event
             * @param callback
             * @returns {*}
             */
            var addListener = function(event, callback) {
                if (config.useSocket) {
                    return socket.addListener(event, callback);
                }
            };

            /**
             *
             * Remove listener on socket
             * The same as on.
             *
             * @param event
             * @param callback
             * @returns {*}
             */
            var removeListener = function(event, callback) {
                if (config.useSocket) {
                    return socket.removeListener(event, callback);
                }
            };

            return {
                forward: forward,
                on: on,
                addListener: addListener,
                removeListener: removeListener,
                emit: emit
            };
        };
    });