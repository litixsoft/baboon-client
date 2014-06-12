'use strict';

describe('bbcMatch', function () {
    var scope, form;

    beforeEach(module('bbc.match'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();

        var element = angular.element(
                '<form name="form">' +
                '<intput type="text" ng-model="model.val1" name="val1" />' +
                '<intput type="text" ng-model="model.val2" name="val2" bbc-match="model.val1" />' +
                '</form>'
        );

        scope.model = {};
        $compile(element)(scope);
        scope.$digest();
        form = scope.form;
    }));

    it('should be initialized correctly', function () {
        expect(scope.model.val1).toBeUndefined();
        expect(scope.model.val2).toBeUndefined();
    });

    it('should pass with integer', function() {
        scope.model.val1 = 'Value';
        scope.model.val2 = 'Other';
        scope.$digest();
        expect(form.val2.$valid).toBe(false);
    });

    it('should pass with integer', function() {
        scope.model.val1 = 'Value';
        scope.model.val2 = 'Value';
        scope.$digest();
        expect(form.val2.$valid).toBe(true);
    });
});