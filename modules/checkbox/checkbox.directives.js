/*global angular*/
angular.module('lx.checkbox.directives', ['lx/checkbox/tpls/checkbox.html'])
    .directive('lxCheckbox', function () {
        return {
            restrict: 'A',
            controller: 'lxCheckboxCtrl',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                disabled: '@'
            },
            templateUrl: 'lx/checkbox/tpls/checkbox.html'
        };
    });

