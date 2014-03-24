'use strict';

angular.module('bbc.pager', [])
    /**
     * @ngdoc directive
     * @name bbc.pager.directive:bbcPager
     * @restrict E
     *
     * @description
     * Creates an pager for custom or server side paging.
     *
     * @example
     * <example module="ngView">
        <file name="index.html">
            <div ng-controller="PagerController">
                <table class="table table-striped">
                    <colgroup>
                        <col style="width:50%;" />
                        <col style="width:50%;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th><bbc-sort sort-opts="sortOpts" field-name="name" on-sorting="sort(sortingOptions)">Name</bbc-sort></th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in items">
                            <td>{{ item.name }}</td>
                            <td>{{ item.index }}</td>
                        </tr>
                    </tbody>
                </table>
                <bbc-pager count="count" current-page="currentPage" page-sizes="[1, 5, 10, 25]" page-size="{{ initialPageSize }}" on-paging="load(pagingOptions)"></bbc-pager>
            </div>
        </file>
        <file name="scripts.js">
            angular.module('ngView', ['bbc.pager']).controller('PagerController', function ($scope) {
                $scope.initialPageSize = 10;
                $scope.pagingOptions = {'skip': 0, 'limit': $scope.initialPageSize};
                $scope.load = function (page) {
                    $scope.pagingOptions = page;
                    getData();
                };

                function getData() {
                    var items = [];
                    for(var i = 0; i < 100; i++) {
                        items.push({name: 'Item ' + (i + 1), index: i});
                    }

                    $scope.items = items.slice($scope.pagingOptions.skip, $scope.pagingOptions.skip + $scope.pagingOptions.limit);
                    $scope.count = 100;
                }

                getData();
            });
        </file>
     </example>
     */
     .directive('bbcPager', function () {
        return {
            restrict: 'E',
            template: '<div class="row">' +
                '<div class="btn-toolbar bbc-pager">' +
                '<div class="btn-group">' +
                '<button class="btn btn-primary" ng-click="firstPage()" ng-disabled="currentPage == 1"><span class="glyphicon glyphicon-step-backward"></span></button>' +
                '<button class="btn btn-primary" ng-click="previousPage()" ng-disabled="currentPage == 1"><span class="glyphicon glyphicon-backward"></span></button>' +
                '</div>' +
                '<div class="btn-group">' +
                '<input class="form-control count-control" type="text" ng-model="currentPage">' +
                '</div>' +
                '<div class="btn-group">' +
                '<button class="btn btn-primary" ng-disabled="true">of {{numberOfPages()}}</button>' +
                '</div>' +
                '<div class="btn-group">' +
                '<button class="btn btn-primary" ng-click="nextPage()" ng-disabled="currentPage >= numberOfPages()"><span class="glyphicon glyphicon-forward"></span></button>' +
                '<button class="btn btn-primary" ng-click="lastPage()" ng-disabled="currentPage >= numberOfPages()"><span class="glyphicon glyphicon-step-forward"></span></button>' +
                '</div>' +
                '<div class="btn-group">' +
                '<select class="form-control" ng-model="pageSize" ng-options="p for p in pageSizeOptions"></select>' +
                '</div>' +
                '<div class="btn-group">' +
                '<button class="btn btn-primary" ng-disabled="true">{{count}} items</button>' +
                '</div>' +
                '</div>' +
                '</div>',
            replace: true,
            scope: {
                count: '=',
                currentPage: '=?',
                onPaging: '&',
                pageSize: '@',
                pageSizes: '@'
            },
            link: function (scope, element, attrs) {
                // default values
                var defaultPageSizeOptions = [1, 5, 10, 25, 100];
                var defaultPageSize = 10;
                scope.currentPage = 1;
                scope.count = scope.count || 0;

                // get page size options from attrs
                attrs.$observe('pageSizes', function (value) {
                    var options = scope.$eval(value);

                    if (angular.isArray(options) && options.length > 0 && typeof options[0] === 'number') {
                        scope.pageSizeOptions = options.sort(function (a, b) {
                            return a - b;
                        });
                    } else if (!scope.pageSizeOptions) {
                        scope.pageSizeOptions = defaultPageSizeOptions;
                    }
                });

                // get page size options from attrs
                attrs.$observe('pageSize', function (value) {
                    var pageSize = scope.$eval(value);

                    if (typeof pageSize === 'number') {
                        if (scope.pageSizeOptions.indexOf(pageSize) === -1) {
                            // add pageSize to pageSizeOptions
                            scope.pageSizeOptions.push(pageSize);
                            scope.pageSizeOptions.sort(function (a, b) {
                                return a - b;
                            });
                        }

                        scope.pageSize = pageSize;
                    } else { // if (typeof scope.pageSize !== 'number') {
                        scope.pageSize = defaultPageSize;
                    }
                });

                /**
                 * Call function from controller to reload the data.
                 */
                scope.refresh = function () {
                    scope.onPaging({pagingOptions: scope.getOptions()});
                };

                /**
                 * Gets the number of items to skip.
                 *
                 * @returns {number}
                 */
                scope.skip = function () {
                    return (scope.currentPage - 1) * scope.pageSize;
                };

                /**
                 * Gets the number of pages.
                 *
                 * @returns {number}
                 */
                scope.numberOfPages = function () {
                    if (scope.pageSize < 1) {
                        scope.pageSize = 1;
                    }

                    return Math.ceil(scope.count / scope.pageSize);
                };

                /**
                 * Gets the paging options.
                 *
                 * @returns {{limit: number, skip: number}}
                 */
                scope.getOptions = function () {
                    return {
                        limit: scope.pageSize,
                        skip: scope.skip()
                    };
                };

                /**
                 * Go to next page
                 */
                scope.nextPage = function () {
                    var currentPage = scope.currentPage,
                        count = currentPage * scope.pageSize;

                    if (count < scope.count) {
                        scope.currentPage = ++currentPage;
                    }
                };

                /**
                 * Go to previous page
                 */
                scope.previousPage = function () {
                    var currentPage = scope.currentPage;

                    if (currentPage !== 1) {
                        scope.currentPage = --currentPage;
                    }
                };

                /**
                 * Go to first page
                 */
                scope.firstPage = function () {
                    scope.currentPage = 1;
                };

                /**
                 * Go to last page
                 */
                scope.lastPage = function () {
                    scope.currentPage = scope.numberOfPages() || 1;
                };

                /**
                 * Trigger reload if currentPage changes.
                 */
                scope.$watch('currentPage', function (oldValue, newValue) {
                    if (oldValue !== newValue) {
                        scope.refresh();
                    }
                });

                /**
                 * Update current page when current page is greater than number of pages.
                 */
                scope.$watch('count', function () {
                    var pageCount = scope.numberOfPages();
                    if (scope.currentPage > pageCount && pageCount > 0) {
                        scope.currentPage = pageCount;
                    }
                });

                /**
                 * Trigger reload if page size changes.
                 */
                scope.$watch('pageSize', function (oldValue, newValue) {
                    // set current page to number of pages when current page is greater than number of pages
                    if (scope.currentPage > scope.numberOfPages()) {
                        scope.currentPage = scope.numberOfPages() || 1;
                    } else if (oldValue !== newValue) {
                        scope.refresh();
                    }
                });
            }
        };
    });