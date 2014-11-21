'use strict';

describe('bbcCheckbox', function () {
    var scope, element, compile;

    beforeEach(module('bbc.checkbox'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
        element = angular.element('<bbc-checkbox ng-model="model.val"></bbc-checkbox>');
        compile(element)(scope);
        scope.model = {};
        scope.checked = {};
        scope.$digest();
    }));

    it('should be initialized correctly', function () {
        expect(scope.model.val).toBeUndefined();
    });

    it('should be true after click when model value is initially undefined', function () {
        expect(scope.model.val).toBeUndefined();
        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });

    it('should be true after click when model value is initially null', function () {
        expect(scope.model.val).toBeUndefined();
        scope.model.val = null;
        scope.$digest();
        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });

    it('should be true after click when model value is initially an empty string', function () {
        expect(scope.model.val).toBeUndefined();
        scope.model.val = '';
        scope.$digest();
        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });

    it('should be true after click when model value is initially number 0', function () {
        expect(scope.model.val).toBeUndefined();
        scope.model.val = 0;
        scope.$digest();
        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });

    it('should be true after click', function () {
        expect(scope.model.val).toBeUndefined();
        scope.model.val = false;
        scope.$digest();
        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });

    it('should be false after click', function () {
        expect(scope.model.val).toBeUndefined();
        scope.model.val = true;
        scope.$digest();
        element.triggerHandler('click');
        expect(scope.model.val).toBeFalsy();
    });

    it('ngModel should be same Value as ngChecked', function () {

        element = angular.element('<bbc-checkbox ng-model="model.val" ng-checked="checked.val"></bbc-checkbox>');
        compile(element)(scope);
        expect(scope.checked.val).toBeUndefined();
        expect(scope.model.val).toBeUndefined();
        scope.checked.val = true;
        scope.$digest();
        expect(scope.checked.val).toBeTruthy();
        expect(scope.model.val).toBeTruthy();
    });

    it('should not be changed after click on disabled', function () {
        scope.model.val = true;
        element = angular.element('<bbc-checkbox name="val" disabled="disabled" ng-model="model.val"></bbc-checkbox>');
        compile(element)(scope);
        scope.$digest();

        element.triggerHandler('click');
        expect(scope.model.val).toBeTruthy();
    });
});