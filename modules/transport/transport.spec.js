'use strict';

describe('bbcTransport', function () {

    describe('factory: $bbcSocket', function () {
        var service, mockSocketFactory;

        // init module
        beforeEach(module('bbc.transport'));

        beforeEach(function () {
            mockSocketFactory = function () {
                return {};
            };

            module(function ($provide) {
                $provide.value('socketFactory', mockSocketFactory);
            });
        });

        it('should be initialized correctly ', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(typeof service).toBe('object');
            expect(typeof service.createSocket).toBe('function');
        });

        it('should create socket connection', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            service.createSocket('host', 1000);
        });

        it('should throw error on wrong parameter count', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function () {
                service.createSocket();
            }).toThrow(new Error('Param "host" and "connectTimeout" are required'));
        });

        it('should throw error on wrong parameter type of "host"', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function () {
                service.createSocket({}, 100);
            }).toThrow(new Error('Param "host" is required and must be of type string!'));
        });

        it('should throw error on wrong parameter type of "connectTimeout"', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function () {
                service.createSocket('host', 'host');
            }).toThrow(new Error('Param "connectTimeout" is required and must be of type number and greater than 0!'));
        });

        it('should throw error on parameter "connectTimeout" being less than 0', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function () {
                service.createSocket('host', -6);
            }).toThrow(new Error('Param "connectTimeout" is required and must be of type number and greater than 0!'));
        });
    });

    describe('Provider: $bbcTransport', function () {

        var transportProvider, transport, mockSocket, mockRootScope, mockLog, mockHttp;

        // init module
        beforeEach(module('bbc.transport'));

        // init mocks
        beforeEach(function () {
            mockSocket = {
                createSocket: function (host, connectTimeout) {
                    return {
                        host: host,
                        connectTimeout: connectTimeout,
                        listeners: {},
                        addListener: function (event, callback) {
                            this.listeners[event] = callback;
                        },
                        removeListener: function (event, callback) {
                            if (this.listeners[event]) {
                                delete this.listeners[event];
                            }

                            callback(null, null);
                        },
                        on: function (event, callback) {
                            this.listeners[event] = callback;
                        },
                        emit: function (event, data, callback) {
                            if (event === 'error') {
                                this.listeners[event]('handshake unauthorized');
                            }
                            if (this.listeners[event]) {
                                this.listeners[event](null, data);
                            }

                            if (event === 'callbackErrorTest') {
                                callback(event);
                                return;
                            }

                            callback(null, data);
                        },
                        forward: function () {
                            return null;
                        }
                    };
                }
            };

            mockRootScope = {
                $emit: function () {}
            };

            mockHttp = {
                post: function () {
                    return this;
                },
                success: function (callback) {
                    callback({});
                    return this;
                },
                error: function (callback) {
                    callback({
                        data: {},
                        status: {},
                        headers: {},
                        config: {}
                    });
                    return this;
                }
            };

            mockLog = {
                message: '',
                lastError: '',
                info: function (data) {
                    this.message += data;
                },
                warn: function (data) {
                    this.message += data;
                },
                error: function (data, error) {
                    this.message += data;
                    this.lastError = error;
                }
            };

            module(function ($provide) {
                $provide.value('$bbcSocket', mockSocket);
                $provide.value('$rootScope', mockRootScope);
                $provide.value('$log', mockLog);
                $provide.value('$http', mockHttp);
            });
        });

        // get transport provider
        beforeEach(module(function ($bbcTransportProvider) {
            transportProvider = $bbcTransportProvider;

            var config = {
                protocol: 'http',
                hostname: 'localhost2',
                port: 4656,
                useSocket: true,
                connectTimeout: 555
            };

            transportProvider.set(config);
        }));

        it('should call set() without params', function () {
            inject(function ($bbcTransport) {
                transportProvider.set();
                transport = $bbcTransport;
            });
        });

        it('should log when connecting is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;
            expect(mockLog.message).toEqual('');

            transport.emit('connecting', {}, function () {
                expect(mockLog.message).toEqual('socket: connecting to ');

                done();
            });
        });

        it('should log when connect is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;
            expect(mockLog.message).toEqual('');

            transport.emit('connect', {}, function () {
                expect(mockLog.message).toEqual('socket: connected');

                done();
            });
        });

        it('should log when disconnect is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;
            expect(mockLog.message).toEqual('');

            transport.emit('disconnect', {}, function () {
                expect(mockLog.message).toEqual('socket: disconnected');

                done();
            });
        });

        it('should log when error is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;
            expect(mockLog.message).toEqual('');

            transport.emit('error', {}, function () {
                expect(mockLog.message).toEqual('socket: handshake unauthorizedthe transmitted session no longer exists, trigger $sessionInactive event.socket: null');

                done();
            });
        });

        it('should get data when emit is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;

            transport.emit('test', {name: 'Joe'}, function (error, result) {
                expect(error).toBeNull();
                expect(result).toBeDefined();
                expect(result).toEqual({name: 'Joe'});

                done();
            });
        });

        it('should get data when registered with on and emit is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;

            transport.on('test', function (error, result) {
                expect(error).toBeNull();
                expect(result).toBeDefined();
                expect(result).toEqual({name: 'Joe'});
            });

            transport.emit('test', {name: 'Joe'}, function (error, result) {
                expect(error).toBeNull();
                expect(result).toBeDefined();
                expect(result).toEqual({name: 'Joe'});

                done();
            });
        });

        it('should get data when registered with addListener and emit is called', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;

            transport.addListener('test', function (error, result) {
                expect(error).toBeNull();
                expect(result).toBeDefined();
                expect(result).toEqual({name: 'Joe'});
            });

            transport.emit('test', {name: 'Joe'}, function (error, result) {
                expect(error).toBeNull();
                expect(result).toBeDefined();
                expect(result).toEqual({name: 'Joe'});

                done();
            });
        });

        it('should process error if callback contains error', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;

            transport.emit('callbackErrorTest', {}, function (error) {
                expect(error).toBeDefined();
                expect(error.data).toBeDefined();
                expect(error.data).toEqual('callbackErrorTest');

                done();
            });
        });

        it('should throw error if emit is called with empty "event" param', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            expect(function () {
                transport.emit('', {});
            }).toThrow(new Error('Param "event" is required and must be of type string!'));
        });

        it('should throw error if emit is called with wrong type of "event" param', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            expect(function () {
                transport.emit({}, {});
            }).toThrow(new Error('Param "event" is required and must be of type string!'));
        });

        it('should throw error if emit is called with wrong type of "callback" param', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            expect(function () {
                transport.emit('test', {});
            }).toThrow(new Error('Param "callback" is required and must be of type function!'));
        });

        it('should throw error if emit is called with wrong type of "data" param', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            expect(function () {
                transport.emit('test', '', {});
            }).toThrow(new Error('Param "data" parameter must be of type object!'));
        });

        it('should add and remove the listener', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            transport.addListener('test2', {});
            transport.removeListener('test2', function () {
                transport.removeListener('test2', function () {
                    done();
                });
            });
        });

        it('should not add and not remove the listener if "config.useSocket" is false', function () {
            inject(function ($bbcTransport) {
                var config = {
                    protocol: 'http',
                    hostname: 'localhost2',
                    port: 4656,
                    useSocket: false,
                    connectTimeout: 555
                };

                transportProvider.set(config);
                transport = $bbcTransport;
            });

            transport.addListener('test', null);
            transport.removeListener('test', null);
        });

        it('should forward an event', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            transport.forward('test', {});
        });

        it('should not forward an event if "config.useSocket" is false', function () {
            inject(function ($bbcTransport) {
                var config = {
                    protocol: 'http',
                    hostname: 'localhost2',
                    port: 4656,
                    useSocket: false,
                    connectTimeout: 555
                };

                transportProvider.set(config);
                transport = $bbcTransport;
            });

            transport.forward('test', {});
        });

        it('should not register an event if "config.useSocket" is false', function () {
            inject(function ($bbcTransport) {
                var config = {
                    protocol: 'http',
                    hostname: 'localhost2',
                    port: 4656,
                    useSocket: false,
                    connectTimeout: 555
                };

                transportProvider.set(config);
                transport = $bbcTransport;
            });

            transport.on('test', {});
        });

        it('should use http if "socketEnabled" is false', function () {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = false;

            transport.emit('callbackErrorTest', {}, function () {
                expect(mockRootScope.isLoading).toBeFalsy();
            });
        });
    });
});