'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/example.html',
                controller: 'ExampleCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
    });
