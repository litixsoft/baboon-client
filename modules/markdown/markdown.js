'use strict';

angular.module('bbc.markdown', [])
    /**
     * @ngdoc directive
     * @name bbc.markdown.directive:bbcMarkdown
     * @restrict A
     *
     * @description
     * Converts markdown to HTML.
     *
     * For more details see our {@link /markdown Guide}.
     *
     */
    .directive('bbcMarkdown', function () {
        var converter = new Showdown.converter();

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                scope.$watch(attrs.ngModel, function (value) {
                    var htmlText = converter.makeHtml(value || '');
                    element.html(htmlText);
                });

            }
        };
    })
    /**
     * @ngdoc directive
     * @name bbc.markdown.directive:bbcMarkdownFile
     * @restrict A
     *
     * @description
     * It is used for presenting same markdown content in different languages by changing the language option. The markdown files where retrieved from the server via the bbcTransport. If the markdown file is valid the directive converts the markdown to HTML.
     *
     * For more details see our {@link /markdown Guide}.
     *
     * @param {string} bbc-markdown-file The path to the markdown files.
     * @param {string} [bbc-markdown-lang='en-us'] Format string for language format.
     */
    .directive('bbcMarkdownFile',[ '$bbcTransport', function ($bbcTransport) {
        var converter = new Showdown.converter({extensions: ['table']});

        return {
            restrict: 'A',
            scope:{
                bbcMarkdownLang: '=',
                bbcMarkdownFile: '='
            },
            link: function (scope, element) {

                scope.$watch('bbcMarkdownLang', function (value) {
                    scope.lang = value.substr(0,2);
                    getMarkdown();
                });

                function getMarkdown(){

                    var data = {
                        root: 'example/public/partials/'+scope.bbcMarkdownFile,
                        file: scope.bbcMarkdownFile,
                        lang: scope.lang,
                        type: 'md'
                    };

                    $bbcTransport.rest('api/files/getMarkdown', data, function (error, result) {
                        if (result) {
                            var htmlText = converter.makeHtml(result.markdown).replace(/<table>/g, '<table class="table table-striped table-bordered"');
                            element.html(htmlText);
                        }
                    });
                }



            }
        };
    }]);