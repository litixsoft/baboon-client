'use strict';

describe('bbcTransport', function () {

    var config = {
        protocol:'http',
        hostname:'localhost2',
        port:4656,
        useSocket:true,
        connectTimeout:555
    };

    describe('Provider: transport', function () {

        var $transportProvider, $transport;

        // get transport
        beforeEach(module('bbc.transport'));

        // get transport provider
        beforeEach(module(function (transportProvider) {
            $transportProvider = transportProvider;
        }));

        beforeEach(inject(function($rootScope, $http, Socket, $window, $log, $controller){
            $rootScope = {};
            $http = {};
            Socket = {};
            $window = {};
            $log = {};

            console.log($controller);

            $transportProvider('.$get', {$rootScope:$rootScope, $http:$http, Socket:Socket, $window:$window, $log:$log});
        }));

        it('should set the config', function () {
            inject(function (transport) {
                $transportProvider.set(config);

                $transport = transport;
            });

        });

    });
});