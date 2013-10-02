/*global angular*/
angular.module('lx.nav.directives',['lxNav/tpls/lxnavbar/outer.html', 'lxNav/tpls/lxnavbar/inner.html', 'lxNav/tpls/lxtreeview/outer.html', 'lxNav/tpls/lxtreeview/inner.html'])
    .directive('lxtreeview', function () {
        return {
            restrict: 'E',
            controller: 'LxTreeViewCtrl',
            transclude: false,
            replace: true,
            scope: {
                iconAttr: '@',
                targetAttr: '@',
                itemlistAttr: '=',
                labelAttr: '@',
                linkAttr: '@',
                ngModel: '@',
                templateAttr: '@',
                methodAttr: '&',
                nrAttr: '@'
            },
            templateUrl: 'lxNav/tpls/lxtreeview/outer.html'
//        templateUrl: 'baboon.nav.tpl/#{attr.templateAttr}/outer.html'
        };
    })
    .directive('lxbootnav', function () {
        return {
            restrict: 'E',
            controller: 'LxTreeViewCtrl',
            transclude: false,
            replace: true,
            scope: {
                iconAttr: '@',
                targetAttr: '@',
                itemlistAttr: '=',
                labelAttr: '@',
                linkAttr: '@',
                typeAttr: '@',
                ngModel: '@',
                nrAttr: '@'
            },
            templateUrl: 'lxNav/tpls/lxnavbar/outer.html'
        };
    });