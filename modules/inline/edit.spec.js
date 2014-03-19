'use strict';

describe('bbc inline edit service', function () {
    var service;

    beforeEach(function () {
        module('bbc.inline.edit');
    });

    beforeEach(function () {
        inject(function ($injector) {
            service = $injector.get('$bbcInlineEdit')();
        });
    });

    it('should be initialized correctly', function () {
        expect(service.model).toBeDefined();
        expect(service.reset).toBeDefined();
        expect(service.isUnchanged).toBeDefined();
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
        it('should set the model', function () {
            var data = { id: 1, name: 'wayne', age: 99 };

            service.setModel(data);

            expect(service.model).toEqual(data);
        });
    });

    describe('reset()', function () {
        it('should reset the model to initial state', function () {
            var data = { id: 1, name: 'wayne', age: 99 };
            var form = {
                $setPristine: function () {}
            };

            service.setModel(data);
            service.model.age = 66;
            service.reset(form);

            expect(service.model).toEqual({id: 1, name: 'wayne', age: 99});
        });
    });

    it('should reset the form errors', function () {
        var data = { id: 1, name: 'wayne', age: 99 },
            form = {
                errors: { id: 'required' },
                $setPristine: function () { }
            };

        service.setModel(data);
        service.model.age = 66;
        service.reset(form);

        expect(service.model).toEqual({id: 1, name: 'wayne', age: 99});
        expect(Object.keys(form.errors).length).toBe(0);
    });

    it('should reset the model to initial state without key', function () {
        var data = { name: 'wayne', age: 99 };

        service.setModel(data);
        service.model.age = 66;
        service.reset();

        expect(service.model).toEqual({name: 'wayne', age: 99});
    });

    describe('populateValidation()', function () {
        it('should add the validation errors', function () {
            var form = { errors: { id: 'required' } };
            var errors = [
                { property: 'date', message: 'format' },
                { property: 'name', message: 'length' }
            ];

            expect(form.errors.id).toBeDefined();
            service.populateValidation(form, errors);
            expect(form.errors.id).toBeUndefined();
            expect(form.errors.date).toBeDefined();
            expect(form.errors.name).toBeDefined();
        });

        it('should not add the validation errors', function () {
            var form = { errors: { id: 'required' } };

            expect(form.errors.id).toBeDefined();
            service.populateValidation(form, null);
            expect(form.errors.id).toBeDefined();
        });
    });
});