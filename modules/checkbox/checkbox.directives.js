'use strict';

angular.module('bbc.checkbox.directives', ['checkbox/tpls/checkbox.html'])
    .directive('bbcCheckbox', function () {
        return {
            restrict: 'A',
            controller: 'BbcCheckboxCtrl',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                disabled: '@'
            },
            templateUrl: 'modules/checkbox/tpls/checkbox.html'
        };
    });

