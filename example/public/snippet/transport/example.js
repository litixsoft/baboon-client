angular.module('ngAppDemo', ['bbc.transport']).controller('NgAppDemoCtrl', function ($rootScope, $scope, $location, $bbcTransport) {
    $scope.messages = [];
    $scope.raiseError = false;

    $bbcTransport.forward('connect', $scope);
    $bbcTransport.forward('disconnect', $scope);

    $scope.$on('socket:connect', function() {
        $scope.messages.push({message: 'CONNECT:  connection successfully'});
    });

    $scope.$on('socket:disconnect', function() {
        $scope.messages.push({message: 'CONNECT: connection lost'});
        $rootScope.socketEnabled = false;
    });

    $scope.setSocketState = function(){
        $rootScope.socketEnabled = !$rootScope.socketEnabled;
    };

    $bbcTransport.on('news', function (data) {
        $scope.messages.push({message: 'NEWS: ' + data});
    });

    $scope.clear = function() {
        $scope.messages = [];
    };

    $scope.send = function() {
        $scope.messages.push({class:'sent', message: 'SENT: ' + $scope.message});

        $bbcTransport.emit('api/echo', {message: $scope.message, error: $scope.raiseError}, function(error, result) {
            if(error){
                $scope.messages.push({class: 'error', message: error.data});
            } else if(result){
                $scope.messages.push({class: 'response', message: 'RESPONSE: ' + result.message});
            }
        });
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };
})
