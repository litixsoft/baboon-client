'use strict';

angular.module('bbc.nav.directives',['nav/tpls/navbar/outer.html', 'nav/tpls/navbar/inner.html', 'nav/tpls/treeview/outer.html', 'nav/tpls/treeview/inner.html'])
    .directive('bbcTreeview', function () {
        return {
            restrict: 'E',
            controller: 'BbcTreeViewCtrl',
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
            templateUrl: 'nav/tpls/treeview/outer.html'
//        templateUrl: 'baboon.nav.tpl/#{attr.templateAttr}/outer.html'
        };
    })
    .directive('bbcBootnav', function () {
        return {
            restrict: 'E',
            controller: 'BbcTreeViewCtrl',
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
            templateUrl: 'nav/tpls/navbar/outer.html'
        };
    });