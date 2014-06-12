angular.module('NgAppDemo', ['bbc.cache']).controller('NgAppDemoCtrl', function ($scope, $bbcCache) {
    $scope.bbcCache = $bbcCache;
    $scope.addToCache = function(user) {
        $bbcCache._user = user;
    };

    $scope.clearCache = function() {
        delete $bbcCache._user;
    };
});