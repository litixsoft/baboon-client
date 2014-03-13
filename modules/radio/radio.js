'use strict';

angular.module('bbc.radio', [])
    /**
     * @ngdoc directive
     * @name bbc.radio.directive:bbcRadio
     * @restrict EA
     *
     * @description
     * Creates a radiobutton with same look and feel on all browser.
     *
     *
     * @example
     <example module="ngView">
         <file name="index1.html">
            <div ng-controller="RadioCtrl">
                 <bbc-radio ng-model="myModel" name="myGroup" label="1" value="1" ng-disabled="isDisabled"></bbc-radio>
                 <bbc-radio ng-model="myModel" name="myGroup" label="2" value="2" ng-disabled="isDisabled"></bbc-radio>
                 <bbc-radio ng-model="myModel" name="myGroup" label="3" value="3" ng-disabled="isDisabled"></bbc-radio>
                 <button class="btn btn-default" ng-click="clickMe()">{{ isDisabled ? 'Enable' : 'Disable' }}</button>
                 <pre>Value: {{ myModel }}</pre>
            </div>
        </file>
         <file name="scripts.js">
            angular.module('ngView', ['bbc.checkbox']).controller('RadioCtrl', function ($scope) {
                $scope.isDisabled = false;
                $scope.clickMe = function() {
                    $scope.isDisabled = !$scope.isDisabled;
                };
            });
         </file>
     </example>
     */
    .directive('bbcRadio', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                label: '@',
                ngModel: '=',
                ngModelText: '@ngModel',
                value: '@',
                name: '@',
                disabled: '@'
            },
            template: '<div class="bbc-radio">' +
                '<div class="radio-button">' +
                    '<input type="radio" ng-model="ngModel" value="{{value}}" name="{{name}}" id="{{ngModelText}}{{value}}" />' +
                    '<label for="{{ngModelText}}{{value}}"><span class="radio-checked"></span></label>' +
                '</div>' +
                    '<div class="title"><label for="{{value}}">{{label}}</label></div>' +
                '</div>',
            link: function (scope, element) {
                scope.$watch('disabled', function (newVal) {
                    var firstChild = angular.element(element.children('div')[0]);
                    if(newVal === 'disabled' || newVal === '' || newVal) {
                        firstChild.find('input').attr('disabled', 'disabled').css('cursor', 'not-allowed');
                        firstChild.css('background-color', '#ccc');
                    }
                    else {
                        firstChild.children('input').removeAttr('disabled').css('cursor', 'default');
                        firstChild.css('background-color', '#fff');
                    }
                });
            }
        };
    });