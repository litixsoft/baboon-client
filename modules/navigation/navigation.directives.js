'use strict';

angular.module('bbc.navigation')
    /**
     * @ngdoc directive
     * @name bbc.navigation.directive:bbcNavigation
     * @requires $bbcNavigation
     * @requires $location
     * @restrict E
     * @throws {TypeError} The method could throw a **TypeError** if the type param is of wrong type.
     *
     * @description
     * Creates a navigation with same look and feel on all browsers.
     *
     * For more information look at the [guide](/nav-home).
     *
     * @param {array} navList The binding to the navigation links in scope.
     * @param {string} type The type of display order of the navigation links. Can be top, sub, list.
     *
     */
    .directive('bbcNavigation', function($bbcNavigation, $location) {
        return {
            restrict: 'E',
            replace: true,
            template: '<ul class="nav nav-pills nav-stacked">' +
                          '<li ng-repeat="item in navList" ng-class="{active: isActive(item.route)}">' +
                              '<a ng-if="item.target" ng-href="{{item.route}}" target="{{item.target}}">{{item.title | translate }}</a>' +
                              '<a ng-if="!item.target" ng-href="{{item.route}}">{{item.title | translate }}</a>' +
                          '</li>' +
                      '</ul>',
            scope: {
                orientation: '@'
            },
            link: function (scope, element, attrs) {
                if(attrs.type !== 'top' && attrs.type !== 'sub' && attrs.type !== 'list') {
                    throw new TypeError('Type must be top, sub or list.');
                }

                var defaults = {
                    top: { fn: 'getTopList', orientation: 'horizontal' },
                    sub: { fn: 'getSubList', orientation: 'vertical' },
                    list: { fn: 'getList', orientation: 'vertical' }
                };

                var fn = defaults[attrs.type].fn;
                var orientation = scope.orientation || defaults[attrs.type].orientation;

                element.toggleClass('nav-stacked', orientation === 'vertical');

                $bbcNavigation[fn](function (error, navList) {
                    if (error || navList.length === 0) {
                        scope.navList = [];
                    }
                    else {
                        scope.navList = navList;
                    }
                });

                scope.isActive = function (route) {
                    if (route === $bbcNavigation.getRoute()) {
                        return true;
                    }

                    return route === $location.path();
                };
            }
        };
    })
/**
 * @ngdoc directive
 * @name bbc.navigation.directive:bbcNavigationTree
 * @requires $bbcNavigation
 * @requires $location
 * @requires $templateCache
 * @restrict E
 *
 * @description
 * Creates a navigation tree with same look and feel on all browsers.
 *
 * For more information look at the [guide](/nav-home).
 *
 * @param {array} navList The binding to the navigation links in scope.
 *
 */
    .directive('bbcNavigationTree', function($bbcNavigation, $location, $templateCache) {
        return {
            restrict: 'E',
            replace: true,
            template:   '<ul class="navlist">'+
                '<li ng-repeat="data in navList"  ng-include="\'bbc/navigation/tpls/treeview/inner.html\'"></li>'+
                '</ul>',
            link: function (scope) {

                $templateCache.put('bbc/navigation/tpls/treeview/inner.html',
                        '<div class="list-item" ng-class="{active: isActive(data.route)}">'+
                        '<div class="opensub {{data.hide}}" ng-show="data.children" ng-click="toggleShow(data)"></div>'+
                        '<div class="nav-icon {{data.icon}}"></div>'+
                        '<a ng-if="!ngClickable" ng-class="{spacer: data.children.length > 0}" ng-href="{{data.route}}" target="{{data.target}}"><span>{{data.title | translate }}</span></a>'+
                        '<a ng-if="ngClickable" ng-click="methodAttr({name: data[linkAttr]});"><span translate>{{data[labelAttr]}}</span></a>'+
                        '</div>'+
                        '<ul class="display {{data.hide}}" ng-if="data.children.length">'+
                        '<li ng-repeat="data in data.children" ng-include="\'bbc/navigation/tpls/treeview/inner.html\'"></li>'+
                        '</ul>');

                scope.app = ($bbcNavigation.getApp());

                scope.openAll = function(list) {
                    var found = false;
                    angular.forEach(list, function(value){
                        if(value.children) {
                            var openLink = scope.openAll(value.children);
                            if (openLink) {
                                value.hide = 'bbc-open';
                            }
                        }
                        if(value.route===$location.path()){
                            found=true;
                        }
                    });
                    return found;
                };


                $bbcNavigation.getTree(function (error, navList) {
                    if (error || navList.length === 0) {
                        scope.navList = [];
                    }
                    else {
                        scope.navList = navList;
                        angular.forEach(scope.navList,function(value){
                            if(value.app===scope.app){
                                value.hide = 'bbc-open';
                            }
                        });
                        scope.openAll(scope.navList);
                    }
                });

                scope.toggleShow = function (data) {
                    if (data.hide === 'bbc-close' || data.hide === undefined) {
                        data.hide = 'bbc-open';
                    } else {
                        data.hide = 'bbc-close';
                    }
                };

                scope.isActive = function (route) {
                    return route === $location.path();
                };
            }
        };
    });
