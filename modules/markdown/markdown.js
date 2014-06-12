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
     * @name bbc.markdown.directive:bbcMarkdownInclude
     * @restrict A
     *
     * @description
     * It is used for converting and presenting markdown as html.
     *
     * For more details see our {@link /markdown Guide}.
     *
     * @param {string} ng-include The path to the markdown files.
     */
    .directive('bbcMarkdownInclude', function () {
        var converter = new Showdown.converter({extensions: ['table']});

        return {
            restrict: 'A',
            scope:{
                ngInclude: '='
            },
            link: function (scope, element) {

                var markdown = element.html();

                if(markdown.length > 0){
                    var htmlText = converter.makeHtml(markdown).replace(/<table>/g, '<table class="table table-striped table-bordered"');
                    element.html(htmlText);
                }
            }
        };
    })
    /**
     * @ngdoc directive
     * @name bbc.markdown.directive:bbcMarkdownFiles
     * @restrict E
     *
     * @description
     * It is used for presenting same markdown content in different languages by changing the language option. The directive (bbcMarkdownInclude) creates the file path based on the current language. This path is passed to the template which ng-includes this files and uses another directive for translating markdown into html.
     *
     * For more details see our {@link /markdown Guide}.
     *
     * @param {string} bbc-markdown-file The path to the markdown files.
     * @param {string} [bbc-markdown-lang='en-us'] Format string for language format.
     */
    .directive('bbcMarkdownFiles', function () {
        return {
            restrict: 'E',
            scope:{
                bbcMarkdownLang: '=',
                bbcMarkdownFile: '='
            },
            template: '<div bbc-markdown-include ng-include="mdPath" ></div>',
            replace: false,
            link: function (scope) {

                scope.$watch('bbcMarkdownLang', function (value) {
                    if(value){
                        scope.lang = value.substr(0,2);
                        if(scope.bbcMarkdownFile && scope.bbcMarkdownFile.length > 0){
                            scope.mdPath = scope.bbcMarkdownFile+'.'+scope.lang+'-'+scope.lang+'.md';
                        }
                    }
                });

            }
        };
    });