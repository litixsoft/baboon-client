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
     * @example
     <example module="ngView">
         <file name="index.html">
            <div ng-controller="MarkdownCtrl" class="container">
                <div class="row">
                    <div class="span9">
                        <textarea ng-model="markdown" ></textarea>
                        <div bbc-markdown ng-model="markdown"></div>
                    </div>
                </div>
            </div>
         </file>
         <file name="scripts.js">
             angular.module('ngView', ['bbc.markdown']).controller('MarkdownCtrl', function ($scope) {
                $scope.markdown = '### H3 Header';
             });
         </file>
     </example>
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
    });