/*global angular, Showdown*/
angular.module('bb.markdown', [])
    .directive('bbMarkdown', function () {
        var converter = new Showdown.converter();

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.ngModel, function (value) {
                    var htmlText = converter.makeHtml(value || '');
                    element.html(htmlText);

                });
            }
        };
    });