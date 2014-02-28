'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'bbc.alert',
        'bbc.checkbox'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', { templateUrl: 'partials/example.html', controller: 'ExampleCtrl' })
            .when('/alert', { templateUrl: 'partials/alert.html', controller: 'AlertCtrl' })
            .when('/checkbox', { templateUrl: 'partials/checkbox.html', controller: 'CheckboxCtrl' })
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
    .controller('CheckboxCtrl', function ($scope) {
        $scope.modelV = false;
        $scope.modelValue = false;
    })
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Alert',
                'link': '/alert'
            },
            {
                'title': 'Checkbox',
                'link': '/checkbox'
            }
        ];



        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
