'use strict';

describe('bbcSort', function () {
    var element, compile, scope;

    beforeEach(module('bbc.sort'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
    }));

    it('should be sort correctly', function () {
        scope.sort = function(options) {
            expect(options.name).toBeDefined();
            expect(options.name).toBe(-1);
        };
        scope.sortOpts = {'name': 1};
        element = angular.element('<bbc-sort sort-opts="sortOpts" field-name="name" on-sorting="sort(sortingOptions)"></bbc-sort>');
        compile(element)(scope);
        scope.$digest();

        var elementScope = element.isolateScope();
        elementScope.sort();
    });

    it('should be return without error', function () {
        scope.sort = function(options) {
            expect(options.name).toBeUndefined();
            expect(options.name1).toBeDefined();
            expect(options.name1).toBe(-1);
        };
        scope.sortOpts = {'name': -1};
        element = angular.element('<bbc-sort sort-opts="sortOpts" field-name="name1" on-sorting="sort(sortingOptions)"></bbc-sort>');
        compile(element)(scope);
        scope.$digest();

        var elementScope = element.isolateScope();
        elementScope.sort();
    });

    it('should be return without error', function () {
        scope.sort = emptyFunctionMock;

        spyOn(scope, 'sort');

        scope.sortOpts = {'name': -1};
        element = angular.element('<bbc-sort field-name="name" on-sorting="sort(sortingOptions)"></bbc-sort>');
        compile(element)(scope);
        scope.$digest();

        var elementScope = element.isolateScope();
        elementScope.sort();

        expect(scope.sort).not.toHaveBeenCalled();
    });
});