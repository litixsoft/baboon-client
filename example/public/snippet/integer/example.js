angular.module('ngAppDemo', ['bbc.float']).controller('NgAppDemoCtrl', function ($scope) {
    $scope.val = '1';
    $scope.initialType = (typeof $scope.val);

    $scope.$watch('val', function() {
        $scope.currentType = (typeof $scope.val);
    });
});