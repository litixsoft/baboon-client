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
        scope.$digest();
    }));

    it('should be initialized correctly', function () {
        expect(scope.model.val).toBeUndefined();
    });

    it('should be true after click', function () {
        expect(scope.model.val).toBeUndefined();
        element.triggerHandler('click');
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