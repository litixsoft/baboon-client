'use strict';

angular.module('bbc.navigation', [])
/**
 * @ngdoc object
 * @name bbc.navigation.$bbcNavigation
 *
 * @description
 * Service for navigation handling and ui.
 *
 */
    .provider('$bbcNavigation', function () {

        var app;
        var route;

        /**
         * Set navigation with app and route of app
         *
         * @param {Object} options - The options of navigation
         */
        this.set = function (options) {
            app = options.app;
            route = options.route;
        };

        this.$get = function ($bbcTransport) {
            var pub = {};

            /**
             * Get the current app
             *
             * @returns {*}
             */
            pub.getApp = function () {
                return app;
            };

            /**
             * Get the current app route
             *
             * @returns {*}
             */
            pub.getRoute = function () {
                return route;
            };

            /**
             * Get navigation tree
             *
             * @param callback
             */
            pub.getTree = function (callback) {
                $bbcTransport.emit('/api/navigation/getTree',{current: app}, callback);
            };

            /**
             * Get navigation flat list
             *
             * @param callback
             */
            pub.getList = function (callback) {
                $bbcTransport.emit('/api/navigation/getList',{current: app}, callback);
            };

            /**
             * Get toplevel of navigation
             *
             * @param callback
             */
            pub.getTopList = function (callback) {
                $bbcTransport.emit('/api/navigation/getTopList',{current: app}, callback);
            };

            /**
             * Get all sub links from application as tree
             *
             * @param callback
             */
            pub.getSubTree = function (callback) {
                $bbcTransport.emit('/api/navigation/getSubTree',{current: app, top: route}, callback);
            };

            /**
             * Get all sub links from application as list
             *
             * @param callback
             */
            pub.getSubList = function (callback) {
                $bbcTransport.emit('/api/navigation/getSubList',{current: app, top: route}, callback);
            };

            return pub;
        };
    });