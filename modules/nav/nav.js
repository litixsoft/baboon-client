'use strict';

angular.module('bbc.nav', [])
    /**
     * @ngdoc object
     * @name bbc.nav.navigation
     *
     * @description
     * Service for navigation handling and ui.
     *
     */
    .provider('navigation', function () {

        var currentApp;

        /**
         * Set navigation with current app and root title
         *
         * @param current
         * @param root {string} title for route /
         */
        this.setCurrentApp = function (current) {
            currentApp = current;
        };

        this.$get = function (transport) {
            var pub = {};

            /**
             * Get the current app
             *
             * @returns {*}
             */
            pub.getCurrentApp = function () {
                return currentApp;
            };

            /**
             * Get navigation tree
             *
             * @param callback
             */
            pub.getTree = function (callback) {
                transport.emit('/api/navigation/getTree',{current: currentApp}, callback);
            };

            /**
             * Get navigation flat list
             *
             * @param callback
             */
            pub.getList = function (callback) {
                transport.emit('/api/navigation/getList',{current: currentApp}, callback);
            };

            /**
             * Get toplevel of navigation
             *
             * @param callback
             */
            pub.getTopList = function (callback) {
                transport.emit('/api/navigation/getTopList',{current: currentApp}, callback);
            };

            /**
             * Get all sub links from a top as tree
             *
             * @param top
             * @param callback
             */
            pub.getSubTree = function (top, callback) {
                transport.emit('/api/navigation/getSubTree',{current: currentApp, top: top}, callback);
            };

            /**
             * Get all sub links from a top as flat list
             *
             * @param top
             * @param callback
             */
            pub.getSubList = function (top, callback) {
                transport.emit('/api/navigation/getSubList',{current: currentApp, top: top}, callback);
            };

            return pub;
        };
    });