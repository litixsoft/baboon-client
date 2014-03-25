'use strict';

angular.module('bbc.checkbox', [])
    /**
     * @ngdoc directive
     * @name bbc.checkbox.directive:bbcCheckbox
     * @restrict EA
     *
     * @description
     * Creates a checkbox with same look and feel on all browser.
     * For more information look at the [guide](/checkbox).
     *
     * @param {string} ng-model The binding to a value in scope.
     *
     */
    .directive('bbcCheckbox', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                disabled: '@'
            },
            template: '<div class="bbc-checkbox" ng-class="{\'disabled\': disabled}">' +
                '<span class="glyphicon"></span>' +
                '</div>',
            link: function (scope, element) {
                scope.$watch('ngModel', function () {
                    element.children('span').toggleClass('glyphicon-ok', scope.ngModel);
                });

                if(!scope.disabled) {
                    element.bind('click', function() {
                        element.children('span').toggleClass('glyphicon-ok ', scope.ngModel);
                        scope.ngModel = !scope.ngModel;
                        scope.$apply();
                    });
                }
            }
        };
    });

