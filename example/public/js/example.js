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
        'bbc.datepicker'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: 'partials/example.html', controller: 'ExampleCtrl' })
            .when('/alert', { templateUrl: 'partials/alert.html', controller: 'AlertCtrl' })
            .when('/checkbox', { templateUrl: 'partials/checkbox.html', controller: 'CheckboxCtrl' })
            .when('/radio', { templateUrl: 'partials/radio.html', controller: 'RadioCtrl' })
            .when('/markdown', { templateUrl: 'partials/markdown.html', controller: 'MarkdownCtrl' })
            .when('/datepicker', { templateUrl: 'partials/datepicker.html', controller: 'DatepickerCtrl' })
            .when('/sort', { templateUrl: 'partials/sort.html', controller: 'SortCtrl' })
            .when('/edit', { templateUrl: 'partials/inlineEdit.html', controller: 'InlineEditCtrl' })
            .when('/reset', { templateUrl: 'partials/reset.html', controller: 'ResetCtrl' })
            .when('/modal', { templateUrl: 'partials/modal.html', controller: 'ModalCtrl' })
            .otherwise({ redirectTo: '/' });
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
    .controller('DatepickerCtrl', function ($scope) {
        $scope.date = new Date();
        $scope.date.setMonth(2); //set March
        $scope.date.setDate(12); //set the 12th

    })
    .controller('CheckboxCtrl', function ($scope) {
        $scope.modelV = false;
        $scope.modelValue = false;
    })
    .controller('RadioCtrl', function ($scope) {
        $scope.modelV = false;
        $scope.modelValue = false;

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
            { 'title': 'RadioButton', 'link': '/radio' },
            { 'title': 'Datepicker', 'link': '/datepicker' },
            { 'title': 'Markdown', 'link': '/markdown' },
            { 'title': 'Sort', 'link': '/sort' },
            { 'title': 'Inline Edit', 'link': '/edit' },
            { 'title': 'UI Reset', 'link': '/reset' },
            { 'title': 'Modal', 'link': '/modal' }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
