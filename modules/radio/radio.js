'use strict';

angular.module('bbc.radio', [])
    /**
     * @ngdoc directive
     * @name bbc.radio.directive:bbcRadio
     * @restrict E
     * @param {string} label The label text.
     * @param {string} ngModel Assignable angular expression to data-bind to bind.
     * @param {string} value The value for the radio button.
     * @param {string} name The name for the radio button.
     * @param {string} disabled A value that indicates the radio button is disabled.
     *
     * @description
     * Creates a radio button with same look and feel on all browser.
     * For more details see our {@link /radio Guide}.
     *
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