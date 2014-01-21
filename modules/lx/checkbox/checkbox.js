/*global angular*/
angular.module('lx.checkbox', ['lx.checkbox.directives'])
    .controller('lxCheckboxCtrl', ['$scope', function ($scope) {
        $scope.isChecked = false;
        $scope.isDisabled = false;

        $scope.$watch('ngModel', function () {
            $scope.isChecked = $scope.ngModel;
        });

        $scope.$watch('disabled', function (val) {
            if (val) {
                $scope.isDisabled = true;
            } else {
                $scope.isDisabled = false;
            }
        });

        $scope.changeState = function () {
            if (!$scope.isDisabled) {
                $scope.isChecked = !$scope.isChecked;

                if ($scope.isChecked) {
                    $scope.ngModel = true;
                } else {
                    $scope.ngModel = false;
                }
            }
        };
    }]);


