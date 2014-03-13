'use strict';

angular.module('bbc.integer', [])
    /**
    * @ngdoc directive
    * @name bbc.integer.directive:bbcInteger
    * @restrict A
    * @element input
    *
    * @description
    * Converts a number to an integer.
    *
    *
    * @example
    <example module="ngView">
        <file name="index.html">
            <div ng-controller="IntCtrl">
                 <p>Please change the number</p>
                 <input type="text" bbc-integer ng-model="val" class="form-control" />
                 <pre>The initial type is: {{ initialType }}</pre>
                 <pre>The current type is: {{ currentType }}</pre>
            </div>
        </file>
        <file name="scripts.js">
        angular.module('ngView', ['bbc.integer']).controller('IntCtrl', function ($scope) {
            $scope.val = '1';
            $scope.initialType = (typeof $scope.val);

            $scope.$watch('val', function() {
                $scope.currentType = (typeof $scope.val);
            });
        });
    </file>
    </example>
    */
    .directive('bbcInteger', function () {
        var INTEGER_REGEXP = /^\-?\d*$/;

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.push(function (viewValue) {
                    if (!viewValue) {
                        // reset validation
                        ctrl.$setValidity('integer', true);
                        return null;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('integer', true);
                        return parseInt(viewValue, 10);
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    if(modelValue === undefined || modelValue === null) {
                        ctrl.$setValidity('integer', true);
                        return modelValue;
                    }
                    ctrl.$setValidity('integer', !isNaN(modelValue));

                    if (!isNaN(modelValue) && modelValue !== null) {
                        modelValue = parseInt(modelValue, 10).toString();
                    }

                    return modelValue;
                });
            }
        };
    });