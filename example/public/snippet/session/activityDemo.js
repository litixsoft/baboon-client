angular.module('session', ['bbc.session'])
    .controller('SessionCtrl', function ($scope, $bbcSession) {
        $scope.activityMessages = [];

        $scope.clearActivity = function () {
            $scope.activityMessages = [];
        };

        $scope.getLastActivity = function () {
            $scope.activityMessages.push('SENT: ' + 'getLastActivity');

            $bbcSession.getLastActivity(function (error, data) {

                if (error) {
                    $scope.activityMessages.push(error);
                }
                else {
                    var now = new Date(data.activity);
                    $scope.activityMessages.push('RESPONSE: ' + 'last activity is ' + now);
                }
            });
        };

        $scope.setActivity = function () {

            var now = new Date();
            $scope.activityMessages.push('SENT: ' + 'set activity to ' + now);

            $bbcSession.setActivity(function (error) {
                if (error) {
                    $scope.activityMessages.push(error);
                }
                else {
                    $scope.activityMessages.push('RESPONSE: true');
                }
            });
        };
    });
