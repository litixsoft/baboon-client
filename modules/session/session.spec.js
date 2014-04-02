'use strict';

describe('bbcSession', function () {

    var session, mockBbcTransport;

    // init module
    beforeEach(module('bbc.session'));

    describe('factory: $bbcSession', function() {

        beforeEach(function () {

            mockBbcTransport = {
                rest: function(route, data, callback) {

                    if (arguments.length < 3) {
                        callback = data;
                        data = {};
                    }

                    callback(null, data);
                }
            };

            module(function ($provide) {
                $provide.value('$bbcTransport', mockBbcTransport);
            });

            inject(function ($injector) {
                session = $injector.get('$bbcSession');
            });
        });

        it('should be initialized correctly ', function () {
            expect(typeof session).toBe('object');
            expect(typeof session.setActivity).toBe('function');
            expect(typeof session.getLastActivity).toBe('function');
            expect(typeof session.setData).toBe('function');
            expect(typeof session.getData).toBe('function');
            expect(typeof session.deleteData).toBe('function');
        });

        it('setData: should throw an Error when not given parameters', function () {
            var func = function () {
                return session.setData();
            };
            expect(func).toThrow(new Error('error: Missing parameters, key, value and callback required'));
        });

        it('setData: should throw an Error when parameter callback is wrong type', function () {
            var func = function () {
                return session.setData('key', 'value', {});
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('setData: should be correctly set data ', function (done) {

            session.setData('key', 'value', function(error, result) {

                expect(error).toBeNull();
                expect(result.key).toBe('key');
                expect(result.value).toBe('value');

                done();
            });
        });

        it('deleteData: should throw an Error when not given parameters', function () {
            var func = function () {
                return session.deleteData();
            };
            expect(func).toThrow(new Error('error: Missing parameters, callback required'));
        });

        it('deleteData: should throw an Error when parameter callback is wrong type', function () {
            var func = function () {
                return session.deleteData('string');
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('deleteData: should be correctly deleted data when parameter key is given', function (done) {

            session.deleteData('key', function(error, result) {

                expect(error).toBeNull();
                expect(result.key).toBe('key');
                done();
            });
        });

        it('deleteData: should be correctly deleted data when parameter key is not given', function (done) {

            session.deleteData(function(error, result) {

                expect(error).toBeNull();
                expect(result).toBeDefined();
                done();
            });
        });

        it('getData: should throw an Error when not given parameters', function () {
            var func = function () {
                return session.getData();
            };
            expect(func).toThrow(new Error('error: Missing parameters, callback required'));
        });

        it('getData: should throw an Error when parameter callback is wrong type', function () {
            var func = function () {
                return session.getData('string');
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('getData: should be correctly data when parameter key is given', function (done) {

            session.getData('key', function(error, result) {

                expect(error).toBeNull();
                expect(result.key).toBe('key');
                done();
            });
        });

        it('getData: should be correctly data when parameter key is not given', function (done) {

            session.deleteData(function(error, result) {

                expect(error).toBeNull();
                expect(result).toBeDefined();
                done();
            });
        });

        it('getLastActivity: should throw an Error when not given parameters', function () {
            var func = function () {
                return session.getLastActivity();
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('getLastActivity: should throw an Error when parameter callback is wrong type', function () {
            var func = function () {
                return session.getLastActivity({});
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('getLastActivity: should be correctly data', function (done) {

            session.getLastActivity(function(error, result) {

                expect(error).toBeNull();
                expect(result).toBeDefined();
                done();
            });
        });

        it('setActivity: should throw an Error when not given parameters', function () {
            var func = function () {
                return session.setActivity();
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('setActivity: should throw an Error when parameter callback is wrong type', function () {
            var func = function () {
                return session.setActivity({});
            };
            expect(func).toThrow(new Error('error: Parameter callback must be function type'));
        });

        it('setActivity: should be correctly data', function (done) {

            session.setActivity(function(error, result) {

                expect(error).toBeNull();
                expect(result).toBeDefined();
                done();
            });
        });
    });
});
