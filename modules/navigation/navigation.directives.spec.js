'use strict';

describe('bbc.navigation', function () {
    var navigationMockTop = [
        { title: 'TEST', route: '/test', app: 'unitTest' }
    ];
/*    var navigationMockSub = [
        { title: 'TEST-SUB', route: '/test-sub', app: 'unitTest' }
    ];
    var navigationMockList = [
        { title: 'TEST', route: '/test', app: 'unitTest', level: 0 },
        { title: 'TEST-SUB', route: '/test-sub', app: 'unitTest', level: 1 }
    ];*/

    describe('navigationList type="top"', function() {
        beforeEach(module('bbc.transport'));
        beforeEach(module('bbc.navigation'));
        //beforeEach(module('bbc.navigation.directives'));
        beforeEach(module('pascalprecht.translate'));

        var $navigation, $scope, location, element, compile;

        beforeEach(function (done) {
            inject(function ($compile, $rootScope, $injector, $location) {
                compile = $compile;
                $navigation = $injector.get('$bbcNavigation');
                location = $location;
                $navigation.getRoute = function() {
                    return('/test');
                };
                $navigation.getTopList = function(callback) {
                    callback(null, navigationMockTop);
                };

                $scope = $rootScope.$new();
                element = angular.element('<bbc-navigation type="top"></bbc-navigation>');
                compile(element)($scope);
                done();
            });
        });

        it('should be correct initialized', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList).toBeDefined();
            expect(elementScope.navList.length).toBe(1);
        });

        it('should attach menus to the scope', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList.length).toBeGreaterThan(0);
            expect(elementScope.navList[0].title).toBe('TEST');
            expect(elementScope.navList[0].route).toBe('/test');
            expect(elementScope.navList[0].app).toBe('unitTest');
        });

        it('should active the correct location', function () {
            var elementScope = element.isolateScope();

            location.path('/test/path');
            expect(elementScope.isActive('/test')).toBe(true);
            expect(elementScope.isActive('/test/path')).toBe(true);
            expect(elementScope.isActive('/test/foo')).toBe(false);
        });

        it('should not have a class nav-stacked', function() {
            expect(element.hasClass('nav-stacked')).toBe(false);
        });

        it('should not add a class by orientation', function() {
            compile(element)($scope);
            expect(element.hasClass('nav-stacked')).toBe(false);
        });

        it('should add a class by orientation', function() {
            element = angular.element('<bbc-navigation type="top" orientation="vertical"></bbc-navigation>');
            compile(element)($scope);
            expect(element.hasClass('nav-stacked')).toBe(true);
        });
    });

/*    describe('navigationList type="sub"', function() {
        beforeEach(module('bbc.transport'));
        beforeEach(module('bbc.navigation'));
        beforeEach(module('bbc.navigation.directives'));
        beforeEach(module('pascalprecht.translate'));

        var $navigation, $scope, location, element, compile;

        beforeEach(function (done) {
            inject(function ($compile, $rootScope, $injector, $location) {
                compile = $compile;
                $navigation = $injector.get('$bbcNavigation');
                location = $location;
                $navigation.getRoute = function() {
                    return('/test-sub');
                };
                $navigation.getSubList = function(callback) {
                    callback(null, navigationMockSub);
                };

                $scope = $rootScope.$new();
                element = angular.element('<bbc-navigation type="sub"></bbc-navigation>');
                compile(element)($scope);
                done();
            });
        });

        it('should be correct initialized', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList).toBeDefined();
            expect(elementScope.navList.length).toBe(1);
        });

        it('should attach menus to the scope', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList.length).toBeGreaterThan(0);
            expect(elementScope.navList[0].title).toBe('TEST-SUB');
            expect(elementScope.navList[0].route).toBe('/test-sub');
            expect(elementScope.navList[0].app).toBe('unitTest');
        });

        it('should active the correct location', function () {
            var elementScope = element.isolateScope();

            location.path('/test-sub/path');
            expect(elementScope.isActive('/test-sub')).toBe(true);
            expect(elementScope.isActive('/test-sub/path')).toBe(true);
            expect(elementScope.isActive('/test-sub/foo')).toBe(false);
        });

        it('should have a class nav-stacked', function() {
            expect(element.hasClass('nav-stacked')).toBe(true);
        });

        it('should remove a class by orientation', function() {
            element = angular.element('<bbc-navigation type="sub" orientation="horizontal"></bbc-navigation>');
            compile(element)($scope);
            expect(element.hasClass('nav-stacked')).toBe(false);
        });
    });

    describe('navigationList type="list"', function() {
        beforeEach(module('bbc.transport'));
        beforeEach(module('bbc.navigation'));
        beforeEach(module('bbc.navigation.directives'));
        beforeEach(module('pascalprecht.translate'));

        var $navigation, $scope, location, element, compile;

        beforeEach(function (done) {
            inject(function ($compile, $rootScope, $injector, $location) {
                compile = $compile;
                $navigation = $injector.get('$bbcNavigation');
                location = $location;
                $navigation.getRoute = function() {
                    return('/test');
                };
                $navigation.getList = function(callback) {
                    callback(null, navigationMockList);
                };

                $scope = $rootScope.$new();
                element = angular.element('<bbc-navigation type="list"></bbc-navigation>');
                compile(element)($scope);
                done();
            });
        });

        it('should be correct initialized', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList).toBeDefined();
            expect(elementScope.navList.length).toBe(2);
        });

        it('should attach menus to the scope', function () {
            var elementScope = element.isolateScope();

            expect(elementScope.navList.length).toBeGreaterThan(0);

            expect(elementScope.navList[0].title).toBe('TEST');
            expect(elementScope.navList[0].route).toBe('/test');
            expect(elementScope.navList[0].app).toBe('unitTest');
            expect(elementScope.navList[0].level).toBe(0);

            expect(elementScope.navList[1].title).toBe('TEST-SUB');
            expect(elementScope.navList[1].route).toBe('/test-sub');
            expect(elementScope.navList[1].app).toBe('unitTest');
            expect(elementScope.navList[1].level).toBe(1);
        });

        it('should active the correct location', function () {
            var elementScope = element.isolateScope();

            location.path('/test/path');
            expect(elementScope.isActive('/test')).toBe(true);
            expect(elementScope.isActive('/test/path')).toBe(true);
            expect(elementScope.isActive('/test/foo')).toBe(false);
        });

        it('should have a class nav-stacked', function() {
            expect(element.hasClass('nav-stacked')).toBe(true);
        });

        it('should remove a class by orientation', function() {
            element = angular.element('<bbc-navigation type="list" orientation="horizontal"></bbc-navigation>');
            compile(element)($scope);
            expect(element.hasClass('nav-stacked')).toBe(false);
        });
    });

    describe('navigationList with error', function() {
        beforeEach(module('bbc.transport'));
        beforeEach(module('bbc.navigation'));
        beforeEach(module('bbc.navigation.directives'));
        beforeEach(module('pascalprecht.translate'));

        var $scope, element, compile;

        beforeEach(function (done) {
            inject(function ($compile, $rootScope, $injector) {
                compile = $compile;
                var $navigation = $injector.get('$bbcNavigation');
                $navigation.getTopList = function(callback) {
                    callback('error');
                };

                $scope = $rootScope.$new();
                element = angular.element('<bbc-navigation type="top"></bbc-navigation>');
                compile(element)($scope);
                done();
            });
        });

        it('should be attach a empty menuTopList', function () {
            var elementScope = element.isolateScope();
            expect(elementScope.navList.length).toBe(0);
        });

        it('should throw an error with missing type', function() {
            element = angular.element('<bbc-navigation></bbc-navigation>');
            expect(function () {
                compile(element)($scope);
            }).toThrow(new Error('Type must be top, sub or list.'));
        });
    });*/
});
