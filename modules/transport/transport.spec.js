'use strict';

describe('bbcTransport', function () {

    describe('Provider: $bbcTransport', function () {

        var transportProvider, transport, mockSocket, mockRootScope, mockLog;

        // init module
        beforeEach(module('bbc.transport'));

        // init mocks
        beforeEach(function () {
            mockSocket = function (host, connectTimeout) {
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
            };

            mockRootScope = {};

            mockLog = {
                message: '',
                lastError: '',
                info: function(data){
                    this.message += data;
                },
                warn: function(data){
                    this.message += data;
                },
                error: function(data, error){
                    this.message += data;
                    this.lastError = error;
                }
            };

            module(function ($provide) {
                $provide.value('Socket', mockSocket);
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
            transport.removeListener('test', function(){
                done();
            });
        });
    });
});