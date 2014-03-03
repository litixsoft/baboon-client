'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'bbc.alert',
        'bbc.checkbox',
        'bbc.radio',
        'bbc.markdown'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', { templateUrl: 'partials/example.html', controller: 'ExampleCtrl' })
            .when('/alert', { templateUrl: 'partials/alert.html', controller: 'AlertCtrl' })
            .when('/checkbox', { templateUrl: 'partials/checkbox.html', controller: 'CheckboxCtrl' })
            .when('/radio', { templateUrl: 'partials/radio.html', controller: 'RadioCtrl' })
            .when('/markdown', { templateUrl: 'partials/markdown.html', controller: 'MarkdownCtrl' })
            .when('/datepicker', { templateUrl: 'partials/datepicker.html', controller: 'DatepickerCtrl' })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
    })
    .controller('AlertCtrl', function ($scope, bbcAlertSrv) {
        $scope.bbcAlert = bbcAlertSrv;
        $scope.showAlert = function() {
            $scope.bbcAlert.danger('Info message from controller');
        };
    })
    .controller('DatepickerCtrl', function () {
    })
    .controller('CheckboxCtrl', function ($scope) {
        $scope.modelV = false;
        $scope.modelValue = false;
    })
    .controller('RadioCtrl', function ($scope) {
        $scope.modelV = false;
        $scope.modelValue = false;

        $scope.isDisabled = false;
        $scope.clickMe = function() {
            $scope.isDisabled = !$scope.isDisabled;
        };
    })
    .controller('MarkdownCtrl', function ($scope) {
        $scope.markdown = '###Hallo'
    })
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.menu = [
            { 'title': 'Home', 'link': '/' },
            { 'title': 'Alert', 'link': '/alert' },
            { 'title': 'Checkbox', 'link': '/checkbox' },
            { 'title': 'RadioButton', 'link': '/radio' },
            { 'title': 'Datepicker', 'link': '/datepicker' },
            { 'title': 'Markdown', 'link': '/markdown' }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
