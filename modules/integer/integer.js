'use strict';

angular.module('bbc.integer', [])
    /**
    * @ngdoc directive
    * @name bbc.integer.directive:bbcInteger
    * @restrict A
    * @element input
    *
    * @description
    * Converts a number to an integer. It convert an empty string to null and a non-number-string to undefined.
    * For more information look at the [guide](/integer).
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