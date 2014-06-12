'use strict';

angular.module('bbc.sort', [])
    /**
     * @ngdoc directive
     * @name bbc.sort.directive:bbcSort
     * @restrict E
     * @param {string} fieldName The name of the property which should sort.
     * @param {object} sortOpts The options for configuration.
     * @param {function(sortingOptions) } onSorting The callback which is called on sorting.
     *
     * @description
     * Directive for custom sorting or server side sorting.
     *
     * For more details see our {@link /sort Guide}.
     *
     */
    .directive('bbcSort', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div><span style="cursor: pointer;" ng-click="sort()" ng-transclude></span>' +
                '<span class="glyphicon" ng-class="{\'glyphicon-arrow-up\': options[field] == 1, \'glyphicon-arrow-down\': options[field] == -1}"></span>' +
                '</div>',
            scope: {
                options: '=sortOpts',
                onSorting: '&'
            },
            link: function (scope, element, attrs) {
                scope.field = attrs.fieldName;

                scope.sort = function () {
                    if (scope.options) {
                        var sort = {};
                        scope.direction = scope.options[scope.field] || 1;
                        scope.direction *= -1;
                        sort[scope.field] = scope.direction;

                        scope.onSorting({sortingOptions: sort});
                    }
                };
            }
        };
    });