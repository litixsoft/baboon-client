/*global angular*/
angular.module('lx.auth', ['lx.auth.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/api/auth/register', {templateUrl: '/lxAuth/register.html'});
        $routeProvider.when('/api/auth/forget', {templateUrl: '/lxAuth/forget.html'});
    }])
    .controller('lxAuthLoginCtrl', ['$scope', '$window', 'lxAuth', function ($scope, $window, lxAuth) {
        var window = angular.element($window);

        $scope.$watch('openMenu', function (newval) {
            if (newval) {
                window.bind('keydown', function (ev) {
                    if (ev.which === 27) { //ESC Key
                        $scope.$apply(function () {
                            $scope.openMenu = false;
                        });
                    }
                });
            } else {
                window.unbind('keydown');
            }
        });

        $scope.authFailed = false;
        $scope.serverError = false;
        $scope.openMenu = false;

        $scope.login = function () {

            auth.login($scope.username, $scope.password, function (err, res) {
                if (res && !err) {
                    $window.location.reload();
                }
                else {
                    if (err.status === 403) {
                        $scope.authFailed = true;
                    }
                    else {
                        $scope.serverError = true;
                    }
                }
            });
        };

        $scope.$watch('username', function () {
            if ($scope.authFailed) {
                $scope.authFailed = false;
            }
        });

        $scope.$watch('password', function () {
            if ($scope.authFailed) {
                $scope.authFailed = false;
            }
        });

        $scope.logout = function () {
            console.log('logout');
        };

        $scope.register = function () {
            console.log('register');
        };
    }]);
