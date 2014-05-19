'use strict';

describe('bbcMarkdown', function () {
    beforeEach(module('bbc.markdown'));

    describe('directive: bbcMarkdown', function () {
        var scope, element, compile;

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

    describe('directive: bbcMarkdownInclude', function () {
        var scope, element, compile;

        beforeEach(inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
            element = angular.element('<div bbc-markdown-include>#Headline</div>');

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should be create valid html from markup', function () {
            expect(element.length).toBe(1);
            expect(element[0].innerHTML).toBe('<h1 id="headline">Headline</h1>');
        });

        it('should be not create html if no markup is present', function () {
            element = angular.element('<div bbc-markdown-include></div>');
            compile(element)(scope);
            expect(element.length).toBe(1);
            expect(element[0].innerHTML).toBe('');
        });
    });

    describe('directive: bbcMarkdownFiles', function () {
        var scope, element, compile;

        beforeEach(inject(function ($compile, $rootScope, $templateCache) {
            $templateCache.put('partials/alert/alert.de-de.md', '#Headline');
            compile = $compile;
            scope = $rootScope.$new();
            scope.currentLang = 'de-de';
            element = angular.element('<bbc-markdown-files bbc-markdown-lang="currentLang" bbc-markdown-file="\'partials/alert/alert\'"></bbc-markdown-files>');

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should be create valid html from markup', function () {
            var elementScope = element.isolateScope();
            expect(elementScope.lang).toBe('de');
            expect(elementScope.mdPath).toBe('partials/alert/alert.de-de.md');
        });

        it('should not set scope.lang if currentLang unset', function () {
            scope.currentLang = '';
            element = angular.element('<bbc-markdown-files bbc-markdown-lang="currentLang" bbc-markdown-file="\'partials/alert/alert\'"></bbc-markdown-files>');
            compile(element)(scope);
            scope.$digest();

            var elementScope = element.isolateScope();
            expect(elementScope.lang).toBe(undefined);
        });

        it('should not set scope.mdPath if bbc-markdown-file unset', function () {
            scope.currentLang = 'de-de';
            element = angular.element('<bbc-markdown-files bbc-markdown-lang="currentLang" bbc-markdown-file=""></bbc-markdown-files>');
            compile(element)(scope);
            scope.$digest();

            var elementScope = element.isolateScope();
            expect(elementScope.mdPath).toBe(undefined);
        });

    });
});

