'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'bbc.alert',
        'bbc.checkbox',
        'bbc.radio',
        'bbc.markdown',
        'bbc.sort',
        'bbc.inline.edit',
        'bbc.reset',
        'bbc.modal',
        'bbc.datepicker',
        'bbc.transport',
        'bbc.integer',
        'bbc.float'
    ])
    .config(function ($routeProvider, $locationProvider, transportProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: 'partials/example.html', controller: 'ExampleCtrl' })
            .when('/alert', { templateUrl: 'partials/alert.html', controller: 'AlertCtrl' })
            .when('/checkbox', { templateUrl: 'partials/checkbox.html', controller: 'CheckboxCtrl' })
            .when('/datepicker', { templateUrl: 'partials/datepicker.html', controller: 'DatepickerCtrl' })
            .when('/edit', { templateUrl: 'partials/inlineEdit.html', controller: 'InlineEditCtrl' })
            .when('/float', { templateUrl: 'partials/float.html', controller: 'FloatCtrl' })
            .when('/integer', { templateUrl: 'partials/integer.html', controller: 'IntegerCtrl' })
            .when('/markdown', { templateUrl: 'partials/markdown.html', controller: 'MarkdownCtrl' })
            .when('/modal', { templateUrl: 'partials/modal.html', controller: 'ModalCtrl' })
            .when('/radio', { templateUrl: 'partials/radio.html', controller: 'RadioCtrl' })
            .when('/reset', { templateUrl: 'partials/reset.html', controller: 'ResetCtrl' })
            .when('/sort', { templateUrl: 'partials/sort.html', controller: 'SortCtrl' })
            .when('/transport', { templateUrl: 'partials/transport.html', controller: 'TransportCtrl' })
            .otherwise({ redirectTo: '/' });
        transportProvider.set();
//        transportProvider.set({useSocket:false, connectTimeout:2000});
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
    })
    .controller('AlertCtrl', function ($scope, bbcAlertSrv) {
        $scope.bbcAlert = bbcAlertSrv;
        $scope.showAlert = function() {
            $scope.bbcAlert.danger('Info message from controller');
        };
    })
    .controller('DatepickerCtrl', function () {
    })
    .controller('CheckboxCtrl', function ($scope) {
        $scope.model1 = false;
        $scope.model2 = true;
    })
    .controller('FloatCtrl', function ($scope) {
        $scope.val = '1.23';
        $scope.initialType = (typeof $scope.val);

        $scope.$watch('val', function() {
            $scope.currentType = (typeof $scope.val);
        });
    })
    .controller('IntegerCtrl', function ($scope) {
        $scope.val = '1';
        $scope.initialType = (typeof $scope.val);

        $scope.$watch('val', function() {
            $scope.currentType = (typeof $scope.val);
        });
    })
    .controller('RadioCtrl', function ($scope) {
        $scope.isDisabled = false;
        $scope.clickMe = function() {
            $scope.isDisabled = !$scope.isDisabled;
        };
    })
    .controller('MarkdownCtrl', function ($scope) {
        $scope.markdown = '###Hallo'
    })
    .controller('SortCtrl', function ($scope) {
        $scope.sortOpts = {'name': -1};

        $scope.items = [
            { name: 'John Doe', city: 'New York', country: 'USA' },
            { name: 'Tina Tester', city: 'Leipzig', country: 'Germany' },
            { name: 'Sam Sample', city: 'Sydney', country: 'Australia' },
            { name: 'Max Mustermann', city: 'Toronto', country: 'Kanada' }
        ];

        $scope.sort = function (sort) {
            $scope.sortOpts = sort;
            var key = '';
            for (var propName in sort) {
                key = propName;
                break;
            }

            $scope.items.sort(function(a, b) {
                var x = a[key];
                var y = b[key];

                return sort[key] === -1 ? (x < y) : (x > y);
            });
        };

        $scope.sort($scope.sortOpts);
    })
    .controller('InlineEditCtrl', function ($scope, bbcInlineEdit) {
        $scope.inlineEdit = bbcInlineEdit();

        $scope.items = [
            { _id : 1, name: 'John Doe', city: 'New York', country: 'USA' },
            { _id : 2, name: 'Tina Tester', city: 'Leipzig', country: 'Germany' },
            { _id : 3, name: 'Sam Sample', city: 'Sydney', country: 'Australia' },
            { _id : 4, name: 'Max Mustermann', city: 'Toronto', country: 'Kanada' }
        ];

        $scope.save = function(item) {
            for(var i = 0; i < $scope.items.length; i++) {
                if(item._id === $scope.items[i]._id) {
                    $scope.items[i] = item;
                    $scope.inlineEdit.model = null;
                    break;
                }
            }
        }
    })
    .controller('ResetCtrl', function () {
    })
    .controller('ModalCtrl', function ($scope, bbcModal) {
        $scope.message = '';

        $scope.popupYesNo = function(){
            var options = {
                id: 'modalExamplePopup',
                backdrop: false,
                headline: 'Ja bzw. Nein drücken!',
                message: 'Wenn Sie "ja" drücken wollen tun sie dies bitte, ansonsten einfach "nein" drücken.',
                type: 'Warning',
                callObj: {
                    cbYes: function () {
                        $scope.message = 'Du hast tatsächlich ja gedrückt.';
                    },
                    cbNo: function () {
                        $scope.message = 'Du willst es also wirklich nicht.';
                    }
                }
            };
            bbcModal.msgBox(options);
        };

        $scope.popupOkClose = function(){
            var options = {
                id: 'modalExamplePopup',
                backdrop: false,
                headline: 'Ok bzw. Close drücken!',
                message: 'Wenn Sie "Ok" drücken wollen tun sie dies bitte, ansonsten einfach "Close" drücken.',
                type: 'Warning',
                callObj: {
                    cbOk: function () {
                        $scope.message = 'Wow, du findest es also auch ok.';
                    },
                    cbClose: function () {
                        $scope.message = 'Dann schließe ich es halt..';
                    }
                }
            };
            bbcModal.msgBox(options);
        };

        $scope.popupModal = function(){
            var options = {
                id: 'modalExamplePopup',
                backdrop: true,
                headline: 'Modales Popup',
                message: 'So ich bin einfach mal ein Modales Popup, cool oder?',
                type: 'Warning',
                callObj: {
                    cbOk: function () {
                        $scope.message = 'Ich schließe das Popup mal für dich.';
                    }
                }
            };
            bbcModal.msgBox(options);
        };

        $scope.popupModalUpdate = function(){

            var options = {
                id: 'modalExamplePopup',
                backdrop: true,
                headline: 'Modales Popup',
                message: 'So ich bin einfach mal ein Modales Popup, cool oder?',
                type: 'Warning',
                callObj: {
                    cbOk: function () {
                        $scope.message = 'Ich schließe das Popup mal für dich.';
                    }
                }
            };
            bbcModal.msgBox(options);

            setTimeout(function(){
                bbcModal.updateMsg('modalExamplePopup','Diese zweite, neue Meldung wird dir von Litixsoft präsentiert!');
            },3000);
        };
    })
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.menu = [
            { 'title': 'Home', 'link': '/' },
            { 'title': 'Alert', 'link': '/alert' },
            { 'title': 'Checkbox', 'link': '/checkbox' },
            { 'title': 'Datepicker', 'link': '/datepicker' },
            { 'title': 'Float', 'link': '/float' },
            { 'title': 'Inline Edit', 'link': '/edit' },
            { 'title': 'Integer', 'link': '/integer' },
            { 'title': 'Markdown', 'link': '/markdown' },
            { 'title': 'Modal', 'link': '/modal' },
            { 'title': 'RadioButton', 'link': '/radio' },
            { 'title': 'Sort', 'link': '/sort' },
            { 'title': 'Transport', 'link': '/transport' },
            { 'title': 'UI Reset', 'link': '/reset' },
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })
    .controller('RestCtrl', function ($scope, $location) {

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })
    .controller('TransportCtrl', function ($rootScope, $scope, $location, transport) {

        $scope.messages = [];
        $scope.raiseError = false;

        transport.forward('connect', $scope);
        transport.forward('disconnect', $scope);

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

//        $scope.$on('$routeChangeStart', function() {
//            socket.disconnect();
//        });
//
        transport.on('news', function (data) {
            $scope.messages.push({message: 'NEWS: ' + data});
        });

        $scope.clear = function() {
            $scope.messages = [];
        };

        $scope.send = function() {
            $scope.messages.push({class:'sent', message: 'SENT: ' + $scope.message});

            transport.emit('api/echo', {message: $scope.message, error: $scope.raiseError}, function(error, result) {
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
    });
