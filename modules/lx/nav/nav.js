/*global angular*/
angular.module('lx.nav', ['lx.nav.directives'])
    .controller('LxTreeViewCtrl', ['$scope', '$element', '$attrs', 'lxNavService',
        function ($scope, $element, $attrs, lxNavService) {

            if (typeof($scope[$attrs.itemlistAttr]) === 'undefined') {
                $scope.treeData = $scope.itemlistAttr;
            } else {
                $scope.treeData = $scope[$attrs.itemlistAttr];
            }

//            function callback (data) {
//
//                var treeData = [];
//
//                if ($attrs.nrAttr === undefined) {
//                    angular.forEach(data, function (value) {
//                        treeData.push({'title': value.title, 'route': value.route, 'target': value.target});
//                    });
//                    $scope.treeData = treeData;
//                } else {
//                    if ($attrs.nrAttr <= data.length - 1) {
//                        $scope.treeData = data[$attrs.nrAttr].children;
//                    }
//                }
//            }
//
//            lxNavService.httpGetNavData($attrs.nrAttr, callback);

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
    ])
    .service('lxNavService', ['$http', function ($http) {
        var pub = {};

        pub.navigation = [];

        pub.httpGetNavData = function (id, callback) {
            $http.get('/api/lxNav/getNavData').success(function (data) {
                return callback(data.data);
            });
        };

        return pub;
    }]);