'use strict';

angular.module('example', [
        'ngRoute',
        'ui.bootstrap',
        'pascalprecht.translate',
        'hljs',
        'bbc.alert',
        'bbc.cache',
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
    .config(function ($routeProvider, $locationProvider, $bbcTransportProvider, $bbcNavigationProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: 'partials/example.html', controller: 'ExampleCtrl' })
            .when('/alert', { templateUrl: 'partials/alert.html', controller: 'AlertCtrl' })
            .when('/cache', { templateUrl: 'partials/cache.html', controller: 'CacheCtrl' })
            .when('/checkbox', { templateUrl: 'partials/checkbox.html', controller: 'CheckboxCtrl' })
            .when('/datepicker', { templateUrl: 'partials/datepicker.html', controller: 'DatepickerCtrl' })
            .when('/edit', { templateUrl: 'partials/inlineEdit.html', controller: 'InlineEditCtrl' })
            .when('/float', { templateUrl: 'partials/float.html', controller: 'FloatCtrl' })
            .when('/integer', { templateUrl: 'partials/integer.html', controller: 'IntegerCtrl' })
            .when('/markdown', { templateUrl: 'partials/markdown.html', controller: 'MarkdownCtrl' })
            .when('/modal', { templateUrl: 'partials/modal.html', controller: 'ModalCtrl' })
            .when('/nav-home', { templateUrl: 'partials/nav_home.html', controller: 'NavHomeCtrl' })
            .when('/nav-home/nav-products', { templateUrl: 'partials/nav_home.html', controller: 'NavHomeCtrl'})
            .when('/nav-home/nav-customers', { templateUrl: 'partials/nav_home.html', controller: 'NavHomeCtrl'})
            .when('/nav-home/nav-statistics', { templateUrl: 'partials/nav_home.html', controller: 'NavHomeCtrl'})
            .when('/nav-admin', { templateUrl: 'partials/nav_admin.html', controller: 'NavAdminCtrl' })
            .when('/nav-admin/nav-rights', { templateUrl: 'partials/nav_admin.html', controller: 'NavAdminCtrl' })
            .when('/nav-admin/nav-groups', { templateUrl: 'partials/nav_admin.html', controller: 'NavAdminCtrl' })
            .when('/nav-admin/nav-users', { templateUrl: 'partials/nav_admin.html', controller: 'NavAdminCtrl' })
            .when('/pager', { templateUrl: 'partials/pager.html', controller: 'PagerCtrl' })
            .when('/radio', { templateUrl: 'partials/radio.html', controller: 'RadioCtrl' })
            .when('/reset', { templateUrl: 'partials/reset.html', controller: 'ResetCtrl' })
            .when('/sort', { templateUrl: 'partials/sort.html', controller: 'SortCtrl' })
            .when('/transport', { templateUrl: 'partials/transport.html', controller: 'TransportCtrl' })
            .when('/session', { templateUrl: 'partials/session.html', controller: 'SessionCtrl' })
            .otherwise({ redirectTo: '/' });

        $bbcTransportProvider.set();
        $bbcNavigationProvider.set({app:'main', route:'home'});

        $translateProvider.useStaticFilesLoader({
            prefix: '/locale/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en-us');
        $translateProvider.fallbackLanguage('en-us');
    })
    .run(function ($rootScope, $translate) {
        $rootScope.switchLocale = function(locale) {
            $translate.use(locale);
        };
    })
    .controller('ExampleCtrl', function ($scope) {
        $scope.view = 'partials/example.html';
    })
    .controller('NavigationCtrl', function ($scope, $location) {
        $scope.menu = [
            { 'title': 'Home', 'link': '/' },
            { 'title': 'bbc.alert', 'link': '/alert' },
            { 'title': 'bbc.cache', 'link': '/cache' },
            { 'title': 'bbc.checkbox', 'link': '/checkbox' },
            { 'title': 'bbc.datepicker', 'link': '/datepicker' },
            { 'title': 'bbc.float', 'link': '/float' },
            { 'title': 'Inline Edit', 'link': '/edit' },
            { 'title': 'Integer', 'link': '/integer' },
            { 'title': 'bbc.markdown', 'link': '/markdown' },
            { 'title': 'bbc.modal', 'link': '/modal' },
            { 'title': 'bbc.navigation', 'link': '/nav-home' },
            { 'title': 'bbc.pager', 'link': '/pager' },
            { 'title': 'bbc.radio', 'link': '/radio' },
            { 'title': 'bbc.sort', 'link': '/sort' },
            { 'title': 'bbc.transport', 'link': '/transport' },
            { 'title': 'bbc.reset', 'link': '/reset' },
            { 'title': 'bbc.session', 'link': '/session' }
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
    .controller('CacheCtrl', function ($scope, $bbcCache) {
        $scope.bbcCache = $bbcCache;
        $scope.addToCache = function(user) {
            $bbcCache['_user'] = user;
        };

        $scope.clearCache = function() {
            delete $bbcCache['_user'];
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
        $scope.disabled = false;
        $scope.clickMe = function() {
            $scope.disabled = !$scope.disabled;
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
    .controller('ModalCtrl', function ($scope, $bbcModal, $translate, $rootScope) {
        var message = '';
        var updatedMessage = '';

        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('MODAL_HEADLINE').then(function (headline) {
                options.headline = headline;
            });
            $translate('MODAL_MESSAGE_BODY').then(function (message) {
                options.message = message;
            });
            $translate('MODAL_YES_TEXT').then(function (text) {
                buttonTextValues.yes = text;
            });
            $translate('MODAL_NO_TEXT').then(function (text) {
                buttonTextValues.no = text;
            });
            $translate('MODAL_CLOSE_TEXT').then(function (text) {
                buttonTextValues.close = text;
            });
            $translate('MODAL_CLICKED_TEXT').then(function (text) {
                message = text;
            });
            $translate('MODAL_UPDATED_MESSAGE').then(function (text) {
                updatedMessage = text;
            });
        });

        $translate.use('en-us');
        $scope.message = '';
        var buttonTextValues = { ok: 'Ok' };
        var options = { id: 'uniqueId', backdrop: false, buttonTextValues: buttonTextValues }

        $scope.popupYesNo = function() {
            options.callObj = {
                cbYes: function () {
                    $scope.message = buttonTextValues.yes + ' ' + message;
                },
                cbNo: function () {
                    $scope.message = buttonTextValues.no + ' ' + message;
                }
            };
            $bbcModal.open(options);
        };

        $scope.popupOkClose = function(){
            options.callObj = {
                cbOk: function () {
                    $scope.message = buttonTextValues.ok + ' ' + message;
                },
                cbClose: function () {
                    $scope.message = buttonTextValues.close + ' ' + message;
                }
            };
            $bbcModal.open(options);
        };

        $scope.popupModal = function(){
            options.backdrop = true;
            options.callObj = {
                cbOk: function () {
                    $scope.message = buttonTextValues.ok + ' ' + message;
                }
            };
            $bbcModal.open(options);
        };

        $scope.popupWithCancel = function(){
            options.backdrop = true;
            $bbcModal.open(options);

            setTimeout(function() {
                $bbcModal.cancel();
            }, 1000);
        };

        $scope.popupModalUpdate = function() {
            options.backdrop = true;
            options.callObj = {
                cbOk: function () {
                    $scope.message = buttonTextValues.ok + ' ' + message;
                }
            };
            $bbcModal.open(options);

            setTimeout(function(){
                $bbcModal.update('uniqueId', updatedMessage);
            }, 2000);
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
