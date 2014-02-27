'use strict';

angular.module('bbc.radio.directives', ['radio/tpls/radio.html'])
    .directive('bbcRadio', function () {
        return {
            restrict: 'A',
            controller: 'BbcRadioCtrl',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                value: '@',
                disabled: '@'
            },
            templateUrl: 'radio/tpls/radio.html'
        };
    });

