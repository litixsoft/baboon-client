'use strict';

angular.module('bbc.socket', [])
    // Wrapper service for socket.io
    .factory('SocketIO', function ($rootScope, $window, $location, $log) {
        function setSocketState (isSocketEnabled) {
            $rootScope.$apply(function () {
                $rootScope.socketEnabled = isSocketEnabled;
            });
        }

        /**
         * SocketIO
         *
         * @param {object=} config The config object
         * @example
         *      config = {
         *          protocol: 'http:',
         *          hostname: 'localhost',
         *          port: 3000,
         *          transports: ['websocket', 'xhr-polling']
         *      };
         *
         *      var socket = new SocketIO(config);
         *      socket.emit('wines/getAll', function(error, result) {
         *          ... work here with result
         *      });
         *
         * @return {{emit: Function, on: Function}} result object with function emit (fire event to server)
         * and on (listen for events from sever)
         */
        return function (config) {
            config = config || {};

            // default settings when config is empty
            var protocol = config.protocol || $window.location.protocol,
                hostname = config.hostname || $window.location.hostname,
                port = config.port || $window.location.port,
                transports = config.transports || ['websocket'],
                host;

            // create host for connect
            if (port.length > 0) {
                // with port
                host = protocol + '//' + hostname + ':' + port;
            } else {
                // without port
                host = protocol + '//' + hostname;
            }

            // socket connect
            var socket = io.connect(host, {'connect timeout': 5000, 'transports': transports});

            // socket disconnect event, change transportSocket to false.
            socket.on('disconnect', function () {
                $log.warn('Lost connection to socket.io.');
                setSocketState(false);
            });

            // socket connect event, change transportSocket to true.
            socket.on('connect', function () {
                $log.info('socket.io connected with: ' + socket.socket.transport.name);
                setSocketState(true);
            });

            socket.on('error', function (reason) {
                $log.error('socket.io connect error. ', reason);
                setSocketState(false);
            });

            // socket connect_error event
            socket.on('connect_error', function (err) {
                $log.error('socket.io connect_error: ', err);

                setSocketState(false);
            });

            // socket connect_timeout event
            socket.on('connect_timeout', function () {
                $log.error('socket.io connect_timeout...');
                setSocketState(false);
            });

            // socket reconnect event, change transportSocket to true
            socket.on('reconnect', function (transport) {
                $log.log('socket.io reconnect with: ' + transport);
                setSocketState(true);
            });

            // socket reconnecting event
            socket.on('reconnecting', function () {
                var reconnectionAttempts = arguments[1] || 0;
                $log.log('Try to reconnect with: ' + socket.socket.transport.name + ', attempt: ' + reconnectionAttempts);

                setSocketState(false);
            });

            // socket reconnect_error
            socket.on('reconnect_error', function (err) {
                $log.error('socket.io reconnect_error: ', err);
                setSocketState(false);
            });

            // socket reconnect_failed
            socket.on('reconnect_failed', function () {
                $log.error('socket.io reconnect_failed');
                setSocketState(false);
            });

            return {
                on: function (eventName, callback) {
                    socket.on(eventName, callback);
                },
                emit: function (eventName, data, callback) {
                    socket.emit(eventName, data, function (data) {
                        callback(data);
                    });
                },
                removeAllListeners: function (eventName) {
                    socket.removeAllListeners(eventName);
                }
            };
        };
    })
    .factory('bbcSocket', function ($rootScope, $window, $location, $log, bbcModal) {
        var protocol = $window.location.protocol,
            hostname = $window.location.hostname,
            port = $window.location.port,
            transports = ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'],
            host;

        // detect karma test runner and remove wensocket from transports (default karma port is 9876)
        if (port > 9870 && port < 9900 && hostname === 'localhost') {
            transports = ['xhr-polling'];
        }

        // create host for connect
        if (port.length > 0) {
            host = protocol + '//' + hostname + ':' + port;
        }
        else {
            host = protocol + '//' + hostname;
        }

        // socket connect
        var socket = io.connect(host, {'connect timeout': 4000, 'transports': transports});

        // socket.io events
        socket.on('disconnect', function () {
            $log.error('Lost connection to Socket.IO');

            $rootScope.$apply(function () {
                bbcModal.msgBox('socketLost', true, 'Lost connection to server!', '', 'Warning');
            });
        });

        socket.on('connect', function () {
            $log.log('socket.io connected with: ' + socket.socket.transport.name);
        });

        socket.on('connect_error', function (err) {
            $log.error('connect_error: ', err);

            $rootScope.$apply(function () {
                bbcModal.msgBox('connectError', true, 'Could not connect to socket server!', '', 'Error');
            });
        });

        socket.on('connect_timeout', function () {
            $log.error('connect_timeout...');
        });

        socket.on('reconnect', function (transport) {
            $log.log('socket.io reconnect with: ' + transport);

            bbcModal.reset(); //close

        });

        socket.on('reconnecting', function () {
            var reconnectionAttempts = arguments[1] || 0;
            $log.log('Try to reconnect with: ' + socket.socket.transport.name + ', attempt: ' + reconnectionAttempts);

            if (reconnectionAttempts === 1) {
                bbcModal.updateMsg('socketLost', ' Trying to reconnect. Attempt: ' + reconnectionAttempts);
            } else {
                bbcModal.updateMsg('socketLost', ' Trying to reconnect. Attempt: ' + reconnectionAttempts);
            }

        });

        socket.on('reconnect_error', function (err) {
            $log.error('socket.io reconnect_error: ', err);
        });

        socket.on('reconnect_failed', function () {
            $log.error('socket.io reconnect_failed');
        });

        socket.on('site_reload', function () {
            $log.warn('Site Reload triggered by Server');

            $rootScope.$apply(function () {
                bbcModal.msgBox('siteReload', true, 'Session is expired! Please reload the site.', '', 'Error', function () {
                    window.location.reload();
                });
            });
        });

        // api
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;

                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;

                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });