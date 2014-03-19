'use strict';

angular.module('bbc.sort', [])
    /**
     * @ngdoc directive
     * @name bbc.sort.directive:bbcSort
     * @restrict E
     * @element input
     *
     * @description
     * Directive for custom sorting or server side sorting.
     *
     * @example
     * <example module="ngView">
           <file name="index.html">
               <div ng-controller="SortController">
                   <table class="table table-striped">
                     <colgroup>
                         <col style="width:40%;" />
                         <col style="width:30%;" />
                         <col style="width:30%;" />
                     </colgroup>
                     <thead>
                         <tr>
                             <th><bbc-sort sort-opts="sortOpts" field-name="name" on-sorting="sort(sortingOptions)">Name</bbc-sort></th>
                             <th><bbc-sort sort-opts="sortOpts" field-name="city" on-sorting="sort(sortingOptions)">City</bbc-sort></th>
                             <th><bbc-sort sort-opts="sortOpts" field-name="country" on-sorting="sort(sortingOptions)">Country</bbc-sort></th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr ng-repeat="item in items">
                             <td>{{ item.name }}</td>
                             <td>{{ item.city }}</td>
                             <td>{{ item.country }}</td>
                         </tr>
                     </tbody>
                 </table>
               </div>
           </file>
           <file name="scripts.js">
                angular.module('ngView', ['bbc.sort']).controller('SortController', function ($scope) {
                    $scope.sortOpts = {'name': -1};

                    $scope.items = [
                        { name: 'John Doe', city: 'New York', country: 'USA' },
                        { name: 'Tina Tester', city: 'Leipzig', country: 'Germany' },
                        { name: 'Sam Sample', city: 'Sydney', country: 'Australia' },
                        { name: 'Max Mustermann', city: 'Toronto', country: 'Kanada' }
                    ];

                    $scope.sort = function (sort) {
                        $scope.sortOpts = sort;
                        var key = '';
                        for (var propName in sort) {
                            key = propName;
                            break;
                        }

                        $scope.items.sort(function(a, b) {
                            var x = a[key];
                            var y = b[key];

                            return sort[key] === -1 ? (x < y) : (x > y);
                        });
                    };

                    $scope.sort($scope.sortOpts);
                });
           </file>
      </example>
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