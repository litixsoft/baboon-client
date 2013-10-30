/*global angular*/
angular.module('lx.auth.directives',['lx/auth/tpls/login_popup.html', 'lx/auth/tpls/logout_popup.html'])
    .directive('lxLoginPopup', function () {
        return {
            restrict: 'E',
            controller: 'lxAuthLoginCtrl',
            transclude: false,
            replace: true,
            templateUrl: 'lx/auth/tpls/login_popup.html'
        };
    })
    .directive('lxLogoutPopup', function () {
        return {
            restrict: 'E',
            controller: 'lxAuthLoginCtrl',
            transclude: false,
            replace: true,
            scope: {
                user: '='
            },
            templateUrl: 'lx/auth/tpls/logout_popup.html'
        };
    });