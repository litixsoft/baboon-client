'use strict';

angular.module('bbc.match', [])
    /**
    * @ngdoc directive
    * @name bbc.match.directive:bbcMatch
    * @restrict A
    * @element input
    *
    * @description
    * Compares two input values for equality.
     *
    * For more information look at the [guide](/match).
    */
    .directive('bbcMatch', [function () {
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function (scope, elem , attrs,control) {
                var matcher = function () {
                    var v1 = scope.$eval(attrs.ngModel);
                    var v2 = scope.$eval(attrs.bbcMatch);
                    return v1 === v2;
                };
                scope.$watch(matcher, function (n) {
                    control.$setValidity('match', n);
                });
            }
        };
    }]);