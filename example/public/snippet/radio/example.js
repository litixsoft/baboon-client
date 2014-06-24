angular.module('ngAppDemo', ['bbc.radio']).controller('NgAppDemoCtrl', function ($scope) {
    $scope.disabled = false;
    $scope.clickMe = function () {
        $scope.disabled = !$scope.disabled;
    };
});