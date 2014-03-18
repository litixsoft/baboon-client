'use strict';

describe('bbcTransport', function () {

    describe('factory: $bbcSocket', function () {
        var service, mockSocketFactory;

        // init module
        beforeEach(module('bbc.transport'));

        beforeEach(function () {
            mockSocketFactory = function(){
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

            expect(function(){
                service.createSocket();
            }).toThrow(new Error('Param "host" and "connectTimeout" are required'));
        });

        it('should throw error on wrong parameter type of "host"', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function(){
                service.createSocket({}, 100);
            }).toThrow(new Error('Param "host" is required and must be of type string!'));
        });

        it('should throw error on wrong parameter type of "connectTimeout"', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function(){
                service.createSocket('host', 'host');
            }).toThrow(new Error('Param "connectTimeout" is required and must be of type number and greater than 0!'));
        });

        it('should throw error on parameter "connectTimeout" being less than 0', function () {
            inject(function ($injector) {
                service = $injector.get('$bbcSocket');
            });

            expect(function(){
                service.createSocket('host', -6);
            }).toThrow(new Error('Param "connectTimeout" is required and must be of type number and greater than 0!'));
        });
    });

    describe('Provider: $bbcTransport', function () {

        var transportProvider, transport, mockSocket, mockRootScope, mockLog;

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
                            if (this.listeners[event]) {
                                this.listeners[event](null, data);
                            }

                            if (callback) {
                                callback(null, data);
                            }
                        }
                    };
                }
            };

            mockRootScope = {};

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
//            console.log(transportProvider);
//            transportProvider.set();

            inject(function ($bbcTransport) {
//                console.log(transportProvider);
                transportProvider.set();

                transport = $bbcTransport;
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

        it('should add and remove the listener', function (done) {
            inject(function ($bbcTransport) {
                transport = $bbcTransport;
            });

            mockRootScope.socketEnabled = true;

            transport.addListener('test', null);
            transport.removeListener('test', function () {
                done();
            });
        });
    });
});