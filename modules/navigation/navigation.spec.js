'use strict';

describe('bbcNavigation', function () {

    describe('provider: $bbcNavigation', function () {

        var navigationProvider, navigation, mockBbcTransport;

        // init module
        beforeEach(module('bbc.navigation'));

        // init mocks
        beforeEach(function () {
            mockBbcTransport = {
                emit: function(route, data, callback){
                    callback(null, data);
                }
            };

            module(function ($provide) {
                $provide.value('$bbcTransport', mockBbcTransport);
            });
        });


        // get transport provider
        beforeEach(module(function ($bbcNavigationProvider) {
            navigationProvider = $bbcNavigationProvider;

            var options = {
                app: 'main',
                route: 'home'
            };

            navigationProvider.set(options);
        }));

        it('should call set() without params', function () {
            inject(function ($bbcNavigation) {
                navigationProvider.set();
                navigation = $bbcNavigation;
            });

            var app = navigation.getApp();
            expect(app).toBeUndefined();

            var route = navigation.getRoute();
            expect(route).toBeUndefined();
        });

        it('should return app when getApp() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            var app = navigation.getApp();
            expect(app).toEqual('main');
        });

        it('should return route when getRoute() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            var route = navigation.getRoute();
            expect(route).toEqual('home');
        });

        it('should return data when getTree() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            navigation.getTree(function(error, result){
                expect(error).toBeNull();
                expect(result).toEqual({current: 'main'});
            });
        });

        it('should return data when getList() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            navigation.getList(function(error, result){
                expect(error).toBeNull();
                expect(result).toEqual({current: 'main'});
            });
        });

        it('should return data when getTopList() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            navigation.getTopList(function(error, result){
                expect(error).toBeNull();
                expect(result).toEqual({current: 'main'});
            });
        });

        it('should return data when getSubTree() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            navigation.getSubTree(function(error, result){
                expect(error).toBeNull();
                expect(result).toEqual({current: 'main', top: 'home'});
            });
        });

        it('should return data when getSubList() is called', function () {
            inject(function ($bbcNavigation) {
                navigation = $bbcNavigation;
            });

            navigation.getSubList(function(error, result){
                expect(error).toBeNull();
                expect(result).toEqual({current: 'main', top: 'home'});
            });
        });
    });
});
