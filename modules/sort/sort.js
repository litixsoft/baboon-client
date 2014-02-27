'use strict';

angular.module('bbc.sort', [])
    .directive('bbcSort', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div><span style="cursor: pointer;" ng-click="sort()" ng-transclude></span>' +
                '<span ng-class="{\'glyphicon glyphicon-arrow-up\': sortOpts[field_name] == 1, \'glyphicon glyphicon-arrow-down\': sortOpts[field_name] == -1}"></span>' +
                '</div>',
            replace: true,
            scope: {
                sortOpts: '=',
                onSorting: '&'
            },
            link: function (scope, element, attrs) {
                scope.field_name = attrs.fieldName;
                scope.internalSortDir = 1;

                scope.sort = function () {
                    scope.onSorting({sortingOptions: scope.getOptions()});
                };

                scope.getOptions = function () {
                    if (scope.sortOpts[scope.field_name]) {
                        scope.internalSortDir = scope.internalSortDir === 1 ? -1 : 1;
                    } else {
                        scope.internalSortDir = 1;
                    }

                    var sort = {};
                    sort[scope.field_name] = scope.internalSortDir;

                    return sort;
                };
            }
        };
    });