'use strict';

angular.module('bbc.alert', [])
    /**
     * @ngdoc object
     * @name bbc.alert.$bbcAlert
     * @requires $log
     * @requires $timeout
     *
     * @description
     * Service for angular-ui alert handling which shows different alert boxes in an application.
     * For more information look at the [guide](/alert).
     *
     */
    .factory('$bbcAlert', function ($log, $timeout) {
        var pub = {};

        // timeout for show alert box.
        pub.timeout = 5000;

        // logLevel for $log
        pub.logLevel = 'info';

        // show or hide alert message box
        pub.visible = false;

        // private for timeout cancel
        var promise = null;

        // private close helper
        var close = function () {
            pub.visible = false;
        };

        // private log helper
        var log = function (type, msg) {

            var level = 0;

            if (pub.logLevel === 'info') {
                level = 4;
            }
            if (pub.logLevel === 'success') {
                level = 3;
            }
            if (pub.logLevel === 'warning') {
                level = 2;
            }
            if (pub.logLevel === 'danger') {
                level = 1;
            }

            if (type === 'info' && level >= 4) {
                $log.info(type + ': ' + msg);
            }
            if (type === 'success' && level >= 3) {
                $log.info(type + ': ' + msg);
            }
            if (type === 'warning' && level >= 2) {
                $log.warn(type + ': ' + msg);
            }
            if (type === 'danger' && level >= 1) {
                $log.error(type + ': ' + msg);
            }
        };

        // private show helper
        var show = function (type, msg) {
            pub.type = type;
            pub.msg = msg;
            pub.visible = true;

            // log in console
            log(type, msg);

            // timeout for close alert
            if (pub.timeout > 0) {
                if (promise) {
                    $timeout.cancel(promise);
                }
                promise = $timeout(function () {
                    close();
                }, pub.timeout);
            }
        };

        /**
         * @ngdoc method
         * @name bbc.alert.$bbcAlert#close
         * @methodOf bbc.alert.$bbcAlert
         *
         * @description
         * Closes the alert message.
         *
         */
        pub.close = function () {
            close();
        };

        /**
         * @ngdoc method
         * @name bbc.alert.$bbcAlert#info
         * @methodOf bbc.alert.$bbcAlert
         *
         * @description
         * Shows an info alert message. It shows messages without a warn level.
         *
         * @param {string} message The message to be displayed.
         */
        pub.info = function (message) {
            show('info', message);
        };

        /**
         * @ngdoc method
         * @name bbc.alert.$bbcAlert#success
         * @methodOf bbc.alert.$bbcAlert
         *
         * @description
         * Shows a success alert message. It shows a confirmation message.
         *
         * @param {string} message The message to be displayed.
         */
        pub.success = function (message) {
            show('success', message);
        };

        /**
         * @ngdoc method
         * @name bbc.alert.$bbcAlert#warning
         * @methodOf bbc.alert.$bbcAlert
         *
         * @description
         * Shows a warning alert message.It shows a message with a middle warn level.
         *
         * @param {string} message The message to be displayed.
         */
        pub.warning = function (message) {
            show('warning', message);
        };

        /**
         * @ngdoc method
         * @name bbc.alert.$bbcAlert#danger
         * @methodOf bbc.alert.$bbcAlert
         *
         * @description
         * Shows a danger alert message. It shows a message with a middle warn level.
         *
         * @param {string} message The message to be displayed.
         */
        pub.danger = function (message) {
            show('danger', message);
        };

        return pub;
    })
    /**
     * @ngdoc directive
     * @name bbc.alert.directive:bbcAlert
     * @restrict E
     *
     * @description
     * Markup for alert. It is the place holder which contains the DOM-content to show alert messages.
     * For more information look at the [guide](/alert).
     *
     */
    .directive('bbcAlert', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="bbc-alert animate-show" ng-show="service.visible">' +
                '<alert class="ng-cloak" type="service.type" close="service.close()">{{ service.msg }}</alert>' +
                '</div>',
            scope: {
                service: '='
            }
        };
    });



