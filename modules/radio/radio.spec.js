'use strict';

describe('bbcRadio', function () {
    var scope, element, compile;

    beforeEach(module('bbc.radio'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
        element = angular.element('<bbc-radio ng-model="model.val" value="1" ng-disabled="model.isDisabled"></bbc-radio>');
        compile(element)(scope);
        scope.model = {};
        scope.$digest();
    }));

    it('should be disable the element', function () {
        scope.model.isDisabled = true;
        scope.$digest();
        expect(element.find('input').css('cursor')).toBe('not-allowed');
        //expect(element.find('input').css('background-color')).toBe('#ccc');
    });

    it('should be enable the element', function () {
        scope.model.isDisabled = false;
        scope.$digest();
        expect(element.find('input').css('cursor')).toBe('default');
        //expect(element.find('input').css('background-color')).toBe('#fff');
    });
});