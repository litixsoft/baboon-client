'use strict';

describe('bbc form service', function () {
    var service;

    beforeEach(function () {
        module('bbc.cache');
        module('bbc.form');
    });

    describe('bbcForm', function () {
        beforeEach(function () {
            inject(function ($injector) {
                service = $injector.get('bbcForm')('test', 'id');
            });
        });

        it('should be initialized correctly', function () {
            expect(service.model).toBeDefined();
            expect(service.reset).toBeDefined();
            expect(service.isUnchanged).toBeDefined();
            expect(service.hasLoadedModelFromCache).toBeDefined();
            expect(service.setModel).toBeDefined();
            expect(service.populateValidation).toBeDefined();
        });

        describe('isUnchanged()', function () {
            it('should return true if there are no changes to the model', function () {
                expect(service.isUnchanged()).toBeTruthy();
            });

            it('should return false if the model has changes', function () {
                service.model.test = 1;
                expect(service.isUnchanged()).toBeFalsy();
            });
        });

        describe('setModel()', function () {
            it('should set the model and store it in chache', function () {
                var data = {
                    id: 1,
                    name: 'wayne',
                    age: 99
                };

                service.setModel(data);

                expect(service.model).toEqual(data);

                inject(function ($injector) {
                    var cache = $injector.get('bbcCache');

                    expect(cache[1]).toEqual(data);
                    expect(cache['1_Master']).toEqual(data);
                });
            });

            it('should delete the old model from cache', function () {
                var data = {id: 1, name: 'wayne', age: 99};

                service.setModel(data);
                service.setModel(data, true);

                expect(service.model).toEqual(data);

                inject(function ($injector) {
                    var cache = $injector.get('bbcCache');

                    expect(cache[1]).toBeUndefined();
                    expect(cache['1_Master']).toBeUndefined();
                });
            });

            it('should delete the old model from cache', function () {
                var data = {name: 'wayne', age: 99};

                inject(function ($injector) {
                    var cache = $injector.get('bbcCache');

                    cache.test = 123;
                    service.setModel(data, true);

                    expect(service.model).toEqual(data);
                    expect(cache.test).toBeUndefined();
                });
            });
        });

        describe('reset()', function () {
            it('should reset the model to initial state', function () {
                var data = {
                    id: 1,
                    name: 'wayne',
                    age: 99
                };

                service.setModel(data);
                service.model.age = 66;
                service.reset();

                expect(service.model).toEqual({id: 1, name: 'wayne', age: 99});

                inject(function ($injector) {
                    var cache = $injector.get('bbcCache');

                    expect(cache[1]).toEqual({id: 1, name: 'wayne', age: 99});
                });
            });

            it('should reset the form errors', function () {
                var data = {
                        id: 1,
                        name: 'wayne',
                        age: 99
                    },
                    form = {
                        errors: {
                            id: 'required'
                        },
                        $setPristine: function () {

                        }
                    };

                service.setModel(data);
                service.model.age = 66;
                service.reset(form);

                expect(service.model).toEqual({id: 1, name: 'wayne', age: 99});
                expect(Object.keys(form.errors).length).toBe(0);
            });

            it('should reset the model to initial state without key', function () {
                var data = {
                    name: 'wayne',
                    age: 99
                };

                service.setModel(data);
                service.model.age = 66;
                service.reset();

                expect(service.model).toEqual({name: 'wayne', age: 99});

                inject(function ($injector) {
                    var cache = $injector.get('bbcCache');

                    expect(cache.test).toEqual({name: 'wayne', age: 99});
                });
            });
        });

        describe('populateValidation()', function () {
            it('should add the validation errors', function () {

            });
        });
    });
});