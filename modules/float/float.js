'use strict';

angular.module('bbc.float', [])
    /**
     * @ngdoc directive
     * @name bbc.float.directive:bbcFloat
     * @restrict A
     * @element input
     *
     * @description
     * Convert and round any number to a float by given decimal places.
     *
     * @param {int=} bbcFloat number of decimal places (default is 2).
     *
     * @example
     <example module="ngView">
     <file name="index.html">
         <div ng-controller="FloatCtrl">
            <input type="text" bbc-float="2" ng-model="model" />
            <pre>{{ model }}</pre>
         </div>
     </file>
     <file name="scripts.js">
        angular.module('ngView', ['bbc.float']).controller('FloatCtrl', function ($scope) {
                $scope.model = 1.235;
        });
     </file>
     </example>
     */
    .directive('bbcFloat', function () {
        var FLOAT_REGEXP = /^\-?\d+((\.|,)?(\d+)?)?$/;

        function roundToDecimal (number, decimal) {
            var zeros = (1.0).toFixed(decimal);
            zeros = zeros.substr(2);
            var mul_div = parseInt('1' + zeros, 10);
            var increment = parseFloat('.' + zeros + '01');

            if (( (number * (mul_div * 10)) % 10) >= 5) {
                number += increment;
            }

            return Math.round(number * mul_div) / mul_div;
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var numberOfDigits = 2;

                // get the number of digits from attr
                attrs.$observe('bbcFloat', function (value) {
                    value = scope.$eval(value);

                    if (typeof value === 'number') {
                        numberOfDigits = value;
                    }
                });

                ctrl.$parsers.push(function (viewValue) {
                    if (!viewValue) {
                        // reset validation
                        ctrl.$setValidity('float', true);
                        return null;
                    }

                    if (FLOAT_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('float', true);

                        return typeof viewValue === 'number' ? roundToDecimal(viewValue, numberOfDigits) : roundToDecimal(parseFloat(viewValue.replace(',', '.')), numberOfDigits);
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('float', false);

                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(function (modelValue) {
                    if(modelValue === undefined || modelValue === null) {
                        ctrl.$setValidity('float', true);
                        return modelValue;
                    }

                    ctrl.$setValidity('float', !isNaN(modelValue));

                    if (!isNaN(modelValue)) {
                        modelValue = parseFloat(modelValue).toFixed(numberOfDigits).replace('.', ',');
                    }

                    return modelValue;
                });
            }
        };
    });