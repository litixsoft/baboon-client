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
    });