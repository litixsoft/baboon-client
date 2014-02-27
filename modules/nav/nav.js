'use strict';

angular.module('bbc.nav', ['bbc.nav.directives'])
    .controller('BbcTreeViewCtrl', function ($scope, $element, $attrs, transport, $log) {
            $scope.currentLink = '';

            function callback (data) {
                var treeData = [];

                if ($attrs.nrAttr === undefined) {
                    angular.forEach(data, function (value) {
                        treeData.push({'title': value.title, 'route': value.route, 'target': value.target});
                    });
                    $scope.treeData = treeData;
                } else {
                    angular.forEach(data, function (value) {
                        if(value.title === $attrs.nrAttr){
                            $scope.treeData = value.children;
                        }
                    });
                }
            }

            // get nav data over rest transport
            transport.rest('nav/getNavData', {}, function(error, result) {
                if (error) {
                    $log.error(error);
                }
                else {
                    callback(result);
                }
            });

            $scope.ngClickable = typeof($attrs.methodAttr) !== 'undefined';

            $scope.type = $attrs.typeAttr;

            $scope.toggleShow = function (data) {
                if (data.hide === 'bbcclose' || data.hide === undefined) {
                    data.hide = 'bbcopen';
                } else {
                    data.hide = 'bbcclose';
                }
            };

            $scope.toggleNav = function (data) {
                if (data.hide === '' || data.hide === undefined) {
                    data.hide = 'open';
                } else {
                    data.hide = '';
                }
            };

            $scope.openLink = function (value) {
                if(value){
                    $scope.currentLink = value;
                }
            };
        }
    );