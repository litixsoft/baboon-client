'use strict';

describe('bbcTransport', function () {

    var config = {
        protocol:'http',
        hostname:'localhost2',
        port:4656,
        useSocket:true,
        connectTimeout:555
    };

    describe('Provider: $bbcTransport', function () {

        var transportProvider, transport;

        // get transport
        beforeEach(module('bbc.transport'));

        // get transport provider
        beforeEach(module(function ($bbcTransportProvider) {
            transportProvider = $bbcTransportProvider;
        }));

//        beforeEach(inject(function($rootScope, $http, Socket, $window, $log, $controller){
//            $rootScope = {};
//            $http = {};
//            Socket = {};
//            $window = {};
//            $log = {};
//
//            console.log($controller);
//
//            $transportProvider('.$get', {$rootScope:$rootScope, $http:$http, Socket:Socket, $window:$window, $log:$log});
//        }));

        it('should set the config', function () {
            inject(function ($bbcTransport) {
                transportProvider.set(config);

                transport = $bbcTransport;
            });

        });

    });
});