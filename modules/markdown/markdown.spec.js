'use strict';

describe('bbcMarkdown', function () {

    // init module
//    beforeEach(module('bbc.transport'));
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

    describe('directive: bbcMarkdownFile', function () {
        var scope, element, compile, mockBbcTransport;

        beforeEach(function () {

            mockBbcTransport = {
                rest: function(route, data, callback) {
//                    console.log('-->'+data.lang);
                    var dat = {
                        title: 'Toll',
                        markdown: '###Headline'
                    };
                    if(data.lang.length>0){
                        callback(null, dat);
                    } else {
                        callback(404);
                    }

                }
            };

            module(function ($provide) {
                $provide.value('$bbcTransport', mockBbcTransport);
            });


        });

        beforeEach(inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
            element = angular.element('<div bbc-markdown-file="\'alert\'" bbc-markdown-lang="currentLang"></div>');

            scope.currentLang = 'en-us';
            compile(element)(scope);
            scope.$digest();
        }));

        it('should create valid html from markup', function () {
            expect(element.length).toBe(1);
            expect(element[0].innerHTML).toBe('<h3 id="headline">Headline</h3>');
            expect(scope.currentLang).toBe('en-us');
        });

        it('should not got any result if no language is assigned', function () {
            element[0].innerHTML = '';
            scope.currentLang = '';
            scope.$digest();
            expect(element[0].innerHTML).toBe('');
        });

    });

});

