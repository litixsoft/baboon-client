angular.module('ngAppDemo', ['bbc.float']).controller('NgAppDemoCtrl', function ($scope) {
    $scope.model = '1.23';

    $scope.initialType = (typeof $scope.val);

    $scope.$watch('val', function() {
        $scope.currentType = (typeof $scope.val);
    });
});