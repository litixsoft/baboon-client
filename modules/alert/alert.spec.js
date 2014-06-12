'use strict';

describe('bbc.alert', function () {
    var service;

    beforeEach(function () {
        module('bbc.alert');

        inject(function ($injector) {
            service = $injector.get('$bbcAlert');
        });
    });

    describe('$bbcAlert', function() {
        it('should be initialized correctly ', function () {
            expect(typeof service).toBe('object');
            expect(typeof service.close).toBe('function');
            expect(typeof service.info).toBe('function');
            expect(typeof service.success).toBe('function');
            expect(typeof service.warning).toBe('function');
            expect(typeof service.danger).toBe('function');
        });

        it('should be invisible after close', function () {
            service.visible = true;
            service.close();
            expect(service.visible).toBeFalsy();
        });

        it('should show a message on info', function () {
            service.visible = false;
            service.info('info test message');
            expect(service.msg).toBe('info test message');
            expect(service.type).toBe('info');
            expect(service.visible).toBeTruthy();
        });

        it('should show a message on success', function () {
            service.visible = false;
            service.logLevel = 'success';
            service.success('success test message');
            expect(service.msg).toBe('success test message');
            expect(service.type).toBe('success');
            expect(service.visible).toBeTruthy();
        });

        it('should show a message on warning', function () {
            service.visible = false;
            service.logLevel = 'warning';
            service.warning('warning test message');
            expect(service.msg).toBe('warning test message');
            expect(service.type).toBe('warning');
            expect(service.visible).toBeTruthy();
        });

        it('should show a message on error', function () {
            service.visible = false;
            service.logLevel = 'danger';
            service.danger('danger test message');
            expect(service.msg).toBe('danger test message');
            expect(service.type).toBe('danger');
            expect(service.visible).toBeTruthy();
        });

        it('should show a message with timout = 0', function () {
            service.visible = false;
            service.logLevel = 'danger';
            service.timeout = 0;
            service.danger('danger test message');
            expect(service.msg).toBe('danger test message');
            expect(service.type).toBe('danger');
            expect(service.visible).toBeTruthy();
        });

        it('should call close if timeout', function () {
            inject(function($timeout) {
                service.visible = false;
                service.logLevel = 'danger';
                service.danger('danger test message');
                $timeout.flush();
                expect(service.msg).toBe('danger test message');
                expect(service.type).toBe('danger');
                expect(service.visible).toBeFalsy();
            });
        });

        it('should set the promise on second call', function () {
            service.visible = false;
            service.logLevel = 'danger';
            service.danger('danger test message');
            service.danger('danger test message');
            expect(service.msg).toBe('danger test message');
            expect(service.type).toBe('danger');
        });
    });

    describe('bbcAlert', function () {
        var scope, element, compile;

        beforeEach(inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
            scope.bbcAlert = service;
            element = angular.element('<bbc-alert service="bbcAlert" on-show="showAlert()"></bbc-alert>');
            compile(element)(scope);
            scope.model = {};
            scope.$digest();
        }));

        it('should be initialized correctly', function () {
            var elementScope = element.isolateScope();
            expect(elementScope.service).toBeDefined();
            expect(typeof elementScope.service).toBe('object');
            expect(typeof elementScope.service.close).toBe('function');
            expect(typeof elementScope.service.info).toBe('function');
            expect(typeof elementScope.service.success).toBe('function');
            expect(typeof elementScope.service.warning).toBe('function');
            expect(typeof elementScope.service.danger).toBe('function');
        });
    });
});
