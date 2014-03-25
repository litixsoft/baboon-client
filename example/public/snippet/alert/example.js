angular.module('NgAppDemoCtrl', ['ui.bootstrap', 'bbc.alert']).controller('AlertCtrl', function ($scope, $bbcAlert) {
    $scope.bbcAlert = $bbcAlert;
    $scope.showAlert = function(type) {
        $scope.bbcAlert[type]('Info message from controller');
    };
});
