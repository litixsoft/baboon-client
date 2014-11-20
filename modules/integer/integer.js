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
     *
    * For more information look at the [guide](/integer).
    */
    .directive('bbcInteger', function () {
        var INTEGER_REGEXP = /^\-?\d+$/;

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                ngModel.$validators.bbcinteger = function (value) {
                    return value === null || value === undefined ? true : INTEGER_REGEXP.test(value);
                };

                ngModel.$parsers.push(function (viewValue) {
                    if (!viewValue) {
                        return null;
                    }

                    return INTEGER_REGEXP.test(viewValue) ? parseInt(viewValue, 10) : NaN;
                });

                ngModel.$formatters.unshift(function (modelValue) {
                    if (!isNaN(modelValue) && modelValue !== null) {
                        modelValue = INTEGER_REGEXP.test(modelValue) ? parseInt(modelValue, 10).toString() : modelValue;
                    }

                    return modelValue;
                });
            }
        };
    });