angular.module('session', ['bbc.session'])
    .controller('SessionCtrl', function ($scope, $bbcSession) {
        $scope.dataMessages = [];

        $scope.clearData = function () {
            $scope.dataMessages = [];
        };

        $scope.getData = function () {

            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0) {

                $scope.dataMessages.push('SENT: ' + 'get all session data');

                $bbcSession.getData(function (error, result) {
                    if (error) {
                        $scope.dataMessages.push(error);
                    }
                    else {
                        $scope.dataMessages.push('RESPONSE: ');
                        $scope.dataMessages.push(result);
                    }
                });
            }
            else {

                $scope.dataMessages.push('SENT: ' + 'get key: ' + $scope.data.key);

                $bbcSession.getData($scope.data.key, function (error, result) {
                    if (error) {
                        $scope.dataMessages.push(error);
                    }
                    else {
                        $scope.dataMessages.push('RESPONSE: ');
                        $scope.dataMessages.push(result);
                    }
                });
            }
        };

        $scope.setData = function () {
            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0 || typeof $scope.data.value === 'undefined' ||
                $scope.data.value.length === 0) {

                $scope.dataMessages.push({class: 'error', message: 'ERROR: ' + 'for save in session is key and value required'});
            }
            else {

                $scope.dataMessages.push({class: 'sent', message: 'SENT: ' + 'setData' + 'key:' + $scope.data.key + ' value:' + $scope.data.value});

                if ($rootScope.socketEnabled) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.setData($scope.data.key, $scope.data.value, function (error, result) {
                    if (error) {
                        $scope.activityMessages.push({class: 'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class: 'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
        };

        $scope.deleteData = function () {
            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0) {

                $scope.dataMessages.push({class: 'sent', message: 'SENT: ' + 'set no key, delete all objects in session.data'});

                if ($rootScope.socketEnabled) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.deleteData(function (error, result) {
                    if (error) {
                        $scope.activityMessages.push({class: 'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class: 'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
            else {

                $scope.dataMessages.push({class: 'sent', message: 'SENT: ' + 'delete ' + $scope.data.key + ' in session.data'});

                if ($rootScope.socketEnabled) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.deleteData($scope.data.key, function (error, result) {
                    if (error) {
                        $scope.activityMessages.push({class: 'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class: 'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
        };
    });
