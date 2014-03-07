'use strict';

describe('bbc.rest', function () {
    var service, $httpBackend;

    beforeEach(function () {
        module('bbc.rest');

        inject(function (_$httpBackend_, $injector) {
            $httpBackend = _$httpBackend_;
            service = $injector.get('bbcRest');
        });
    });

    describe('bbcRest', function() {

        it('should be initialized correctly ', function () {
            expect(typeof service).toBe('object');
            expect(typeof service.post).toBe('function');
            expect(typeof service.get).toBe('function');
            expect(typeof service.put).toBe('function');
            expect(typeof service.delete).toBe('function');
        });

        /**
         * Get request
         */

        it('get should be return data with config', function () {

            var route = '/api/test/getAll';
            var config = {test:true};

            $httpBackend.expectGET(route)
                .respond(200, {test:'success'});

            service.get(route, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(data.test).toBe('success');
                expect(status).toBe(200);
                expect(config.test).toBe(true);
            }, config);

            $httpBackend.flush();
        });

        it('get should be return data without config', function () {

            var route = '/api/test/getAll';

            $httpBackend.expectGET(route)
                .respond(200, {test:'success'});

            service.get(route, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(data.test).toBe('success');
                expect(status).toBe(200);
            });

            $httpBackend.flush();
        });

        it('get should be return error', function () {

            var route = '/api/test/getAll';

            $httpBackend.expectGET(route)
                .respond(500, 'error message');

            service.get(route, function(error, data) {

                expect(data).toBeUndefined();
                expect(error).toBeDefined();
                expect(error.data).toBeDefined();
                expect(error.status).toBeDefined();
                expect(error.headers).toBeDefined();
                expect(error.config).toBeDefined();

                expect(error.status).toBe(500);
                expect(error.data).toBe('error message');
            });

            $httpBackend.flush();
        });

        /**
         * Post request
         */

        it('post should be return data with config', function () {

            var route = '/api/test/getUser';
            var requestData = {id: 22};
            var responseData = {id: 22, name: 'testUser'};
            var config = {test:true};

            $httpBackend.expectPOST(route)
                .respond(200, responseData);

            service.post(route, requestData, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data.id).toBe(responseData.id);
                expect(data.name).toBe(responseData.name);
                expect(config.test).toBe(true);
            }, config);

            $httpBackend.flush();
        });

        it('post should be return data without config', function () {

            var route = '/api/test/getUser';
            var requestData = {id: 22};
            var responseData = {id: 22, name: 'testUser'};

            $httpBackend.expectPOST(route)
                .respond(200, responseData);

            service.post(route, requestData, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data.id).toBe(responseData.id);
                expect(data.name).toBe(responseData.name);
            });

            $httpBackend.flush();
        });

        it('post should be return error', function () {

            var route = '/api/test/getUser';
            var requestData = {id: 22};

            $httpBackend.expectPOST(route)
                .respond(500, 'error message');

            service.post(route, requestData, function(error, data) {

                expect(data).toBeUndefined();
                expect(error).toBeDefined();
                expect(error.data).toBeDefined();
                expect(error.status).toBeDefined();
                expect(error.headers).toBeDefined();
                expect(error.config).toBeDefined();

                expect(error.status).toBe(500);
                expect(error.data).toBe('error message');
            });

            $httpBackend.flush();
        });



        /**
         * Put request
         */

        it('put should be return data with config', function () {

            var route = '/api/test/updateUser';
            var requestData = {id: 22, name: 'testUser'};
            var responseData = 'testUser 22 successfully updated';
            var config = {test:true};

            $httpBackend.expectPUT(route)
                .respond(200, responseData);

            service.put(route, requestData, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data).toBe(responseData);
                expect(config.test).toBe(true);
            }, config);

            $httpBackend.flush();
        });

        it('put should be return data without config', function () {

            var route = '/api/test/updateUser';
            var requestData = {id: 22, name: 'testUser'};
            var responseData = 'testUser 22 successfully updated';

            $httpBackend.expectPUT(route)
                .respond(200, responseData);

            service.put(route, requestData, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data).toBe(responseData);
            });

            $httpBackend.flush();
        });

        it('put should be return error', function () {

            var route = '/api/test/getAll';
            var requestData = {name: 'testUser'};

            $httpBackend.expectPUT(route)
                .respond(500, 'error message');

            service.put(route, requestData, function(error, data) {

                expect(data).toBeUndefined();
                expect(error).toBeDefined();
                expect(error.data).toBeDefined();
                expect(error.status).toBeDefined();
                expect(error.headers).toBeDefined();
                expect(error.config).toBeDefined();

                expect(error.status).toBe(500);
                expect(error.data).toBe('error message');
            });

            $httpBackend.flush();
        });

        /**
         * Delete request
         */

        it('delete should be return data with config', function () {

            var route = '/api/test/deleteUser/22';
            var responseData = 'testUser 22 successfully deleted';
            var config = {test:true};

            $httpBackend.expectDELETE(route)
                .respond(200, responseData);

            service.delete(route, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data).toBe(responseData);
                expect(config.test).toBe(true);
            }, config);

            $httpBackend.flush();
        });

        it('delete should be return data without config', function () {

            var route = '/api/test/deleteUser/22';
            var responseData = 'testUser 22 successfully deleted';

            $httpBackend.expectDELETE(route)
                .respond(200, responseData);

            service.delete(route, function(error, data, status, headers, config) {
                expect(error).toBeNull();
                expect(data).toBeDefined();
                expect(status).toBeDefined();
                expect(headers).toBeDefined();
                expect(config).toBeDefined();

                expect(status).toBe(200);
                expect(data).toBe(responseData);
            });

            $httpBackend.flush();
        });

        it('delete should be return error', function () {

            var route = '/api/test/deleteUser/22';

            $httpBackend.expectDELETE(route)
                .respond(500, 'error message');

            service.delete(route, function(error, data) {

                expect(data).toBeUndefined();
                expect(error).toBeDefined();
                expect(error.data).toBeDefined();
                expect(error.status).toBeDefined();
                expect(error.headers).toBeDefined();
                expect(error.config).toBeDefined();

                expect(error.status).toBe(500);
                expect(error.data).toBe('error message');
            });

            $httpBackend.flush();
        });
    });
});

