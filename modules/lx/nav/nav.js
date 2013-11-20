/*global angular*/
angular.module('lx.nav', ['lx.nav.directives'])
    .controller('LxTreeViewCtrl', ['$scope', '$element', '$attrs', 'lxTransport', '$log',
        function ($scope, $element, $attrs, transport, $log) {

            function callback (data) {

                var treeData = [];

                if ($attrs.nrAttr === undefined) {
                    angular.forEach(data, function (value) {
                        treeData.push({'title': value.title, 'route': value.route, 'target': value.target});
                    });
                    $scope.treeData = treeData;
                } else {
                    if ($attrs.nrAttr <= data.length - 1) {
                        $scope.treeData = data[$attrs.nrAttr].children;
                    }
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