'use strict';

angular.module('bbc.radio', [])
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
            controller: function ($scope) {
                $scope.checked = function () {
                    return $scope.value === $scope.model;
                };
            },
            template: '<div class="bbc-radio">' +
                '<div class="radio-button">' +
                '<input type="radio" ng-model="ngModel" value="{{value}}" name="{{name}}" id="{{ngModelText}}{{value}}" />' +
                '<label for="{{ngModelText}}{{value}}"><span class="radio-checked"></span></label>' +
                '</div>' +
                '<div class="title"><label for="{{value}}">{{label}}</label></div>' +
                '</div>',
            link: function (scope, element, attrs) {
                //console.log(attrs['disabled']);
                if (attrs.disabled) {
                    element.children('div').children('input').attr('disabled', 'disabled');
                }
                else {
                    element.children('div').children('input').removeAttr('disabled');
                }

            }
        };
    });