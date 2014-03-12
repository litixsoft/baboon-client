'use strict';

angular.module('bbc.checkbox', [])
    /**
     * @ngdoc directive
     * @name bbc.checkbox.directive:bbcCheckbox
     * @restrict EA
     *
     * @description
     * Creates a checkbox with same look and feel on all browser.
     *
     *
     * @example
     <example module="ngView">
        <file name="index.html">
            <style type="text/css">
                 .bbc-checkbox { border: 1px solid black; background: white; border-radius: 4px; width: 20px; height: 20px; display:inline-block; margin:0; padding:0 2px; }
                 .bbc-checkbox span { height: 14px;margin:0;padding:0; }
                 .bbc-checkbox.disabled { border: 1px solid rgb(84, 84, 84); background: lightgray; color: rgb(84, 84, 84); cursor: not-allowed; }
            </style>
            <div ng-controller="CheckboxCtrl">
                 <bbc-checkbox ng-model="model1" disabled="disabled"></bbc-checkbox> I'm disabled!
                 <br />
                 <div bbc-checkbox ng-model="model2" title="I'm a tool tip"></div> I'm {{ model2 ? 'checked' : 'not checked'}}
            </div>
     </file>
     <file name="scripts.js">
        angular.module('ngView', ['bbc.checkbox']).controller('CheckboxCtrl', function ($scope) {
            $scope.model1 = false;
            $scope.model2 = true;
        });
     </file>
     </example>
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

