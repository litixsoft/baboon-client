'use strict';

describe('bbcMarkdown', function () {
    var scope, element, compile;

    beforeEach(module('bbc.markdown'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
        element = angular.element('<div bbc-markdown ng-model="markdown"></div>');

        scope.markdown = '##Hallo';
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should be create valid html from markup', function () {
        expect(element.length).toBe(1);
        expect(element[0].innerHTML).toBe('<h2 id="hallo">Hallo</h2>');
    });

    it('should be create empty html with empty markup', function () {
        scope.markdown = null;
        scope.$digest();

        expect(element.length).toBe(1);
        expect(element[0].innerHTML).toBe('');
    });
});

