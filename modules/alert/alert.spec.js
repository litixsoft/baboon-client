'use strict';

describe('bbc.alert', function () {
    var service;

    beforeEach(function () {
        module('bbc.alert');

        inject(function ($injector) {
            service = $injector.get('bbcAlert');
        });
    });

    it('should be initialized correctly ', function () {
        expect(typeof service).toBe('object');
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
        service.logLevel = 'error';
        service.error('error test message');
        expect(service.msg).toBe('error test message');
        expect(service.type).toBe('error');
        expect(service.visible).toBeTruthy();
    });

    it('should show a message with timout = 0', function () {
        service.visible = false;
        service.logLevel = 'error';
        service.timeout = 0;
        service.error('error test message');
        expect(service.msg).toBe('error test message');
        expect(service.type).toBe('error');
        expect(service.visible).toBeTruthy();
    });

    it('should call close if timeout', function () {
        inject(function($timeout) {
            service.visible = false;
            service.logLevel = 'error';
            service.error('error test message');
            $timeout.flush();
            expect(service.msg).toBe('error test message');
            expect(service.type).toBe('error');
            expect(service.visible).toBeFalsy();
        });
    });

    it('should set the promise on second call', function () {
        service.visible = false;
        service.logLevel = 'error';
        service.error('error test message');
        service.error('error test message');
        expect(service.msg).toBe('error test message');
        expect(service.type).toBe('error');
    });
});
