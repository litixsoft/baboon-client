'use strict';

angular.module('bbc.checkbox', [])
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

