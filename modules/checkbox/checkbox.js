'use strict';

angular.module('bbc.checkbox', ['bbc.checkbox.directives'])
    .controller('BbcCheckboxCtrl', function ($scope) {
        $scope.isChecked = false;
        $scope.isDisabled = false;

        $scope.$watch('ngModel', function () {
            $scope.isChecked = $scope.ngModel;
        });

        $scope.$watch('disabled', function (val) {
            /*if (val) {
                $scope.isDisabled = true;
            } else {
                $scope.isDisabled = false;
            }*/
            $scope.isDisabled = val;
        });

        $scope.changeState = function () {
            if (!$scope.isDisabled) {
                $scope.isChecked = !$scope.isChecked;
                $scope.ngModel = $scope.isChecked;
                /*if ($scope.isChecked) {
                    $scope.ngModel = true;
                } else {
                    $scope.ngModel = false;
                }*/
            }
        };
    });