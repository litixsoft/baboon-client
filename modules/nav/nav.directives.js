/*global angular*/
angular.module('lx.nav.directives',['lx/nav/tpls/navbar/outer.html', 'lx/nav/tpls/navbar/inner.html', 'lx/nav/tpls/treeview/outer.html', 'lx/nav/tpls/treeview/inner.html'])
    .directive('treeview', function () {
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
            templateUrl: 'lx/nav/tpls/treeview/outer.html'
//        templateUrl: 'baboon.nav.tpl/#{attr.templateAttr}/outer.html'
        };
    })
    .directive('bootnav', function () {
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
            templateUrl: 'lx/nav/tpls/navbar/outer.html'
        };
    });