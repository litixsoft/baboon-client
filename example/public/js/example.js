'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'pascalprecht.translate',
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
        'bbc.float',
        'bbc.pager',
        'bbc.navigation',
        'bbc.session'
    ])
    .config(function ($routeProvider, $locationProvider, $bbcTransportProvider, $bbcNavigationProvider) {
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
            .when('/nav_home', { templateUrl: 'partials/nav_home.html', controller: 'NavHomeCtrl' })
            .when('/nav_admin', { templateUrl: 'partials/nav_admin.html', controller: 'NavAdminCtrl' })
            .when('/pager', { templateUrl: 'partials/pager.html', controller: 'PagerCtrl' })
            .when('/radio', { templateUrl: 'partials/radio.html', controller: 'RadioCtrl' })
            .when('/reset', { templateUrl: 'partials/reset.html', controller: 'ResetCtrl' })
            .when('/sort', { templateUrl: 'partials/sort.html', controller: 'SortCtrl' })
            .when('/transport', { templateUrl: 'partials/transport.html', controller: 'TransportCtrl' })
            .when('/session', { templateUrl: 'partials/session.html', controller: 'SessionCtrl' })
            .otherwise({ redirectTo: '/' });
        $bbcTransportProvider.set();
        $bbcNavigationProvider.set({app:'main', route:'home'});
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
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
            { 'title': 'Navigation', 'link': '/nav_home' },
            { 'title': 'Pager', 'link': '/pager' },
            { 'title': 'RadioButton', 'link': '/radio' },
            { 'title': 'Sort', 'link': '/sort' },
            { 'title': 'Transport', 'link': '/transport' },
            { 'title': 'UI Reset', 'link': '/reset' }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })
    .controller('AlertCtrl', function ($scope, $bbcAlert) {
        $scope.bbcAlert = $bbcAlert;
        $scope.showAlert = function(type) {
            $scope.bbcAlert[type]('Info message from controller');
        };
    })
    .controller('DatepickerCtrl', function ($scope) {
        $scope.date = new Date();
        $scope.date.setMonth(2); //set March
        $scope.date.setDate(12); //set the 12th

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
    .controller('PagerCtrl', function ($scope) {
        $scope.initialPageSize = 10;
        $scope.pagingOptions = {'skip': 0, 'limit': $scope.initialPageSize};

        $scope.load = function (page) {
            $scope.pagingOptions = page;
            getData();
        };

        function getData() {
            var items = [];
            for(var i = 0; i < 100; i++) {
                items.push({name: 'Item ' + (i + 1), index: i});
            }

            $scope.items = items.slice($scope.pagingOptions.skip, $scope.pagingOptions.skip + $scope.pagingOptions.limit);
            $scope.count = 100;
        }

        getData();
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
    .controller('InlineEditCtrl', function ($scope, $bbcInlineEdit) {
        $scope.inlineEdit = $bbcInlineEdit();

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
    .controller('ModalCtrl', function ($scope, $bbcModal) {
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
            $bbcModal.msgBox(options);
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
            $bbcModal.msgBox(options);
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
            $bbcModal.msgBox(options);
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
            $bbcModal.msgBox(options);

            setTimeout(function(){
                $bbcModal.updateMsg('modalExamplePopup','Diese zweite, neue Meldung wird dir von Litixsoft präsentiert!');
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
            { 'title': 'Session', 'link': '/session' }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })
    .controller('NavHomeCtrl', function ($scope, $rootScope) {

        $rootScope.socketEnabled = false;
    })
    .controller('NavAdminCtrl', function ($scope, $rootScope) {

        $rootScope.socketEnabled = false;
    })
    .controller('RestCtrl', function ($scope, $location) {

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    })
    .controller('TransportCtrl', function ($rootScope, $scope, $location, $bbcTransport) {

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
    .controller('SessionCtrl', function ($scope, $bbcSession, $rootScope) {

        $scope.activityMessages = [];

        $scope.clearActivity = function() {
            $scope.activityMessages = [];
        };

        $scope.getLastActivity = function() {
            $scope.activityMessages.push({class:'sent', message: 'SENT: ' + 'getLastActivity'});

            if ($rootScope.socketEnabled ) {
                $rootScope.socketEnabled = false;
            }

            $bbcSession.getLastActivity(function(error, data) {

                console.log(data.activity);

                if(error) {
                    $scope.activityMessages.push({class:'error', message: error});
                }
                else {
                    var now = new Date(data.activity);
                    $scope.activityMessages.push({class: 'response', message: 'RESPONSE: ' + 'last activity is ' + now});
                }
            });
        };

        $scope.setActivity = function() {

            var now = new Date();
            $scope.activityMessages.push({class:'sent', message: 'SENT: ' + 'set activity to ' + now});

            if ($rootScope.socketEnabled ) {
                $rootScope.socketEnabled = false;
            }

            $bbcSession.setActivity(function(error) {
                if(error) {
                    $scope.activityMessages.push({class:'error', message: error});
                }
                else {
                    $scope.activityMessages.push({class: 'response', message: 'RESPONSE: true'});

                    $scope.apply = function() {
                        $scope.data.key = '';
                        $scope.data.value = '';
                    };
                }
            });
        };

        $scope.dataMessages = [];

        $scope.clearData = function() {
            $scope.dataMessages = [];
        };

        $scope.getData = function () {

            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0) {

                $scope.dataMessages.push({class:'sent', message: 'SENT: ' + 'get all session data'});

                if ($rootScope.socketEnabled ) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.getData(function (error, result) {
                    if (error) {
                        $scope.dataMessages.push({class:'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class:'response', message: 'RESPONSE: '});
                        $scope.dataMessages.push({class:'response', message: result});
                    }
                });
            }
            else {

                $scope.dataMessages.push({class:'sent', message: 'SENT: ' + 'get key: ' + $scope.data.key});

                if ($rootScope.socketEnabled ) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.getData($scope.data.key, function (error, result) {
                    if (error) {
                        $scope.dataMessages.push({class:'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class:'response', message: 'RESPONSE: ' });
                        $scope.dataMessages.push({class:'response', message: result});
                    }
                });
            }
        };

        $scope.setData = function () {
            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0 || typeof $scope.data.value === 'undefined' ||
                $scope.data.value.length === 0) {

                $scope.dataMessages.push({class:'error', message: 'ERROR: ' + 'for save in session is key and value required'});
            }
            else {

                $scope.dataMessages.push({class:'sent', message: 'SENT: ' + 'setData' + 'key:' + $scope.data.key + ' value:' + $scope.data.value});

                if ($rootScope.socketEnabled ) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.setData($scope.data.key, $scope.data.value, function (error, result) {

                    if(error) {
                        $scope.activityMessages.push({class:'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class:'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
        };

        $scope.deleteData = function () {
            if (typeof $scope.data === 'undefined' || typeof $scope.data.key === 'undefined' ||
                $scope.data.key.length === 0) {

                $scope.dataMessages.push({class:'sent', message: 'SENT: ' + 'set no key, delete all objects in session.data'});

                if ($rootScope.socketEnabled ) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.deleteData(function (error, result) {
                    if (error) {
                        $scope.activityMessages.push({class:'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class:'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
            else {

                $scope.dataMessages.push({class:'sent', message: 'SENT: ' + 'delete ' + $scope.data.key + ' in session.data'});

                if ($rootScope.socketEnabled ) {
                    $rootScope.socketEnabled = false;
                }

                $bbcSession.deleteData($scope.data.key, function (error, result) {
                    if (error) {
                        $scope.activityMessages.push({class:'error', message: error});
                    }
                    else {
                        $scope.dataMessages.push({class:'response', message: 'RESPONSE: ' + result});
                    }
                });
            }
        };
    });
