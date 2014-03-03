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