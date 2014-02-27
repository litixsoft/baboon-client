'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'bbc.alert'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/example.html',
                controller: 'ExampleCtrl'
            })
            .when('/alert', {
                templateUrl: 'partials/alert.html',
                controller: 'AlertCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
    })
    .controller('AlertCtrl', function ($scope, bbcAlert) {
        $scope.view = 'partials/alert.html';

        $scope.showAlert = function () {
            bbcAlert.info('Info message from controller');
        };
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
            }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
