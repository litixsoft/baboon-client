'use strict';

angular.module('bbc.reset', [])
    /**
     * @ngdoc directive
     * @name bbc.reset.directive:bbcReset
     * @requires $compile
     * @requires $timeout
     * @throws {TypeError} The method could throw a **TypeError** if you use not a input filed or pass the type param of the wrong type.
     *
     * @restrict A
     * @element input
     *
     * @description
     * Adds an icon to reset the model of an input field.
     * For more details see our {@link /reset Guide}.
     *
     */
    .directive('bbcReset', function ($compile, $timeout) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: function (scope, elem, attrs, ctrl) {
                // limit to input element of specific types
                //var inputTypes = /text|search|tel|url|email|password/i;
                var inputTypes = ['text', 'search', 'tel', 'url', 'email', 'password'];
                if (elem[0].nodeName !== 'INPUT') {
                    throw new TypeError('resetField is limited to input elements');
                }
                //if (!inputTypes.test(attrs.type)) {
                if(inputTypes.indexOf(attrs.type) === -1) {
                    throw new TypeError('Invalid input type for resetField: ' + attrs.type);
                }

                var span = $compile('<span ng-show="enabled" ng-click="reset()" class="glyphicon glyphicon-remove"></span>')(scope);
                elem.wrap('<div class="right-inner-addon">').after(span);

                scope.reset = function() {
                    ctrl.$setViewValue(null);
                    ctrl.$render();
                    $timeout(function() {
                        elem[0].focus();
                    }, 0, false);
                };

                elem.bind('input', function() {
                    // NgModelController.$isEmpty
                    scope.enabled = !ctrl.$isEmpty(elem.val());
                })
                .bind('focus', function() {
                    scope.enabled = !ctrl.$isEmpty(elem.val());
                    scope.$apply();
                });
            }
        };
    });