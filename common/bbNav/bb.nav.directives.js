/*global angular*/
angular.module('bb.nav.directives',['bb.nav.tpl/lxnavbar/outer.html', 'bb.nav.tpl/lxnavbar/inner.html', 'bb.nav.tpl/lxtreeview/outer.html', 'bb.nav.tpl/lxtreeview/inner.html'])
    .directive('bbNavTreeView', function () {
        return {
            restrict: 'E',
            controller: 'bbNavTreeViewCtrl',
            transclude: false,
            replace: true,
            scope: {
                iconAttr: '@',
                itemlistAttr: '=',
                labelAttr: '@',
                linkAttr: '@',
                ngModel: '@',
                templateAttr: '@',
                methodAttr: '&'
            },
            templateUrl: 'lx.baboon.nav.tpl/lxtreeview/outer.html'
//        templateUrl: 'baboon.nav.tpl/#{attr.templateAttr}/outer.html'
        };
    })
    .directive('bbNavBootNav', function () {
        return {
            restrict: 'E',
            controller: 'bbNavTreeViewCtrl',
            transclude: false,
            replace: true,
            scope: {
                iconAttr: '@',
                itemlistAttr: '=',
                labelAttr: '@',
                linkAttr: '@',
                typeAttr: '@',
                ngModel: '@'
            },
            templateUrl: 'bb.nav.tpl/lxnavbar/outer.html'
        };
    });