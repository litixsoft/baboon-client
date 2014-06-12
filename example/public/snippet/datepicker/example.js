angular.module('NgAppDemo', ['bbc.datepicker']).controller('NgAppDemoCtrl', function ($scope) {
    $scope.date = new Date();
    $scope.date.setMonth(2); //set March
    $scope.date.setDate(12); //set the 12th
});