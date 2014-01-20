/*global angular*/
angular.module('lx.radio.directives', ['lx/radio/tpls/radio.html'])
    .directive('lxRadio', function () {
        return {
            restrict: 'A',
            controller: 'lxRadioCtrl',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                value: '@',
                disabled: '@'
            },
            templateUrl: 'lx/radio/tpls/radio.html'
        };
    });

