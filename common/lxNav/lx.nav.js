/*global angular*/
angular.module('lx.nav', ['lx.nav.directives'])
    .controller('lxNavTreeViewCtrl', ['$scope', '$element', '$attrs',
        function ($scope, $element, $attrs) {

            if (typeof($scope[$attrs.itemlistAttr]) === 'undefined') {
                $scope.treeData = $scope.itemlistAttr;
            } else {
                $scope.treeData = $scope[$attrs.itemlistAttr];
            }

            $scope.ngClickable = typeof($attrs.methodAttr) !== 'undefined';

            $scope.type = $attrs.typeAttr;

            $scope.toggleShow = function (data) {
                if (data.hide === 'lxclose' || data.hide === undefined) {
                    data.hide = 'lxopen';
                } else {
                    data.hide = 'lxclose';
                }
            };

            $scope.toggleNav = function (data) {
                if (data.hide === '' || data.hide === undefined) {
                    data.hide = 'open';
                } else {
                    data.hide = '';
                }
            };
        }
    ]);