angular.module('NgAppDemo', ['bbc.checkbox']).controller('NgAppDemoCtrl', function ($scope) {
    $scope.model1 = false;
    $scope.model2 = true;
    $scope.check2 = false;
    $scope.model3 = true;
    $scope.model4 = true;
    $scope.model5 = true;
    $scope.model6 = undefined;
    $scope.model = {
        isDisabled: true
    };
});