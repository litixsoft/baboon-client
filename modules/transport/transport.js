'use strict';

angular.module('bbc.transport', ['btford.socket-io'])
    /**
     * @ngdoc object
     * @name bbc.transport.$bbcSocket
     *
     * @description
     * Service for socket connection.
     *
     * @param {object} socketFactory The socket io object
     */
    .factory('$bbcSocket', function (socketFactory) {
        var pub = {};

        function Connection(host, connectTimeout) {
            var connection = io.connect(host, {'connect timeout': connectTimeout});

            pub.connection = connection;

            return socketFactory({
                // Creates a new socket connection.
                ioSocket: connection
            });
        }

        /**
         * @ngdoc method
         * @name bbc.transport.$bbcSocket#createSocket
         * @methodOf bbc.transport.$bbcSocket
         *
         * @description
         * Set navigation with app and route of app
         *
         * @param {string} host The host connection string
         * @param {number} connectTimeout The connection timeout
         */
        pub.createSocket = function (host, connectTimeout) {
            // when 2 is callback in data, rewrite this
            if(arguments.length !== 2) {
                throw new TypeError('Param "host" and "connectTimeout" are required');
            }

            // check host
            if (typeof host !== 'string' || host.length === 0) {
                throw new TypeError('Param "host" is required and must be of type string!');
            }

            // check connectTimeout
            if (typeof connectTimeout !== 'number' || connectTimeout < 0) {
                throw new TypeError('Param "connectTimeout" is required and must be of type number and greater than 0!');
            }

            return new Connection(host, connectTimeout);
        };

        return pub;
    })

    /**
     * @ngdoc object
     * @name bbc.transport.$bbcTransport
     *
     * @description
     * Service for transport.
     *
     */
    .provider('$bbcTransport', function () {
        var config = {};

        /**
         * @ngdoc method
         * @name bbc.transport.$bbcTransport#set
         * @methodOf bbc.transport.$bbcTransport
         *
         * @description
         * Setup the transport configuration
         *
         * @param {object} options The options for config
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
         * @ngdoc method
         * @name bbc.transport.$bbcTransport#$get
         * @methodOf bbc.transport.$bbcTransport
         *
         * @description
         * Get instance of transport
         *
         * @param {object} $rootScope The root scope
         * @param {object} $http The http request
         * @param {object} $bbcSocket The socket
         * @param {object} $window The window
         * @param {object} $log The log
         * @returns {object} The current transport provider
         */
        this.$get = function ($rootScope, $http, $bbcSocket, $window, $log) {
            var pub = {};

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
                socket.on('error', function (error) {
                    $log.error('socket: ' + error, error);

                    if(error === 'handshake unauthorized') {
                        $log.warn('the transmitted session no longer exists, trigger $sessionInactive event.');
                        $rootScope.$emit('$sessionInactive');
                    }

                    $rootScope.socketEnabled = false;
                });
            };

            // check useSocket
            if(config.useSocket) {
                // create socket instance
                socket = $bbcSocket.createSocket(config.host, config.connectTimeout);

                // register events
                registerSocketEvents(socket);
            }

            /**
             * @ngdoc method
             * @name bbc.transport.$bbcTransport#emit
             * @methodOf bbc.transport.$bbcTransport
             *
             * @description
             * Emit transport fire event to socket or request post to server.
             * Rest route is socket event name.
             *
             * @param {!string} event - The socket and rest event route.
             * @param {!(object|function)} data - The data object for server.
             * @param {function=} callback - The callback.
             */
            pub.emit = function(event, data, callback) {

                // when 2 is callback in data, rewrite this
                if(arguments.length === 2) {
                    callback = data;
                    data = {};
                }

                // check event
                if (typeof event !== 'string' || event.length === 0) {
                    throw new TypeError('Param "event" is required and must be of type string!');
                }

                // check data
                if (typeof data !== 'object') {
                    throw new TypeError('Param "data" parameter must be of type object!');
                }

                // check callback
                if (typeof callback !== 'function') {
                    throw new TypeError('Param "callback" is required and must be of type function!');
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
             * @ngdoc method
             * @name bbc.transport.$bbcTransport#forward
             * @methodOf bbc.transport.$bbcTransport
             *
             * @description
             * Forward events to angular
             *
             * @param {string} event The event to listen to
             * @param {object} scope The scope to forward the events
             * @returns {Function} callback - The callback.
             */
            pub.forward = function(event, scope) {
                if (config.useSocket) {
                    return socket.forward(event, scope);
                }
            };

            /**
             * @ngdoc method
             * @name bbc.transport.$bbcTransport#on
             * @methodOf bbc.transport.$bbcTransport
             *
             * @description
             * Register events on socket
             *
             * @param {string} event The event to listen to
             * @param {function} callback The function to be called after event is raised
             * @returns {Function} callback - The callback.
             */
            pub.on = function(event, callback) {
                if (config.useSocket) {
                    return socket.on(event, callback);
                }
            };

            /**
             * @ngdoc method
             * @name bbc.transport.$bbcTransport#addListener
             * @methodOf bbc.transport.$bbcTransport
             *
             * @description
             * Add listener on socket
             * The same as on.
             *
             * @param {string} event The event to listen to
             * @param {function} callback The function to be called after the event is raised
             * @returns {Function} callback - The callback.
             */
            pub.addListener = function(event, callback) {
                if (config.useSocket) {
                    return socket.addListener(event, callback);
                }
            };

            /**
             * @ngdoc method
             * @name bbc.transport.$bbcTransport#removeListener
             * @methodOf bbc.transport.$bbcTransport
             *
             * @description
             * Remove listener on socket
             * The same as on.
             *
             * @param {string} event The event to listen to
             * @param {function} callback The function to be called after event is removed from socket
             * @returns {Function} callback - The callback.
             */
            pub.removeListener = function(event, callback) {
                if (config.useSocket) {
                    return socket.removeListener(event, callback);
                }
            };

            return pub;
        };
    });