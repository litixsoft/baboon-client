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
         * @ngdoc method
         * @name bbc.navigation.$bbcNavigation#set
         * @methodOf bbc.navigation.$bbcNavigation
         *
         * @description
         * Set navigation with app and route of app
         *
         * @param {object} options The options of navigation
         */
        this.set = function (options) {
            options = options || {};

            app = options.app;
            route = options.route;
        };

        /**
         * @ngdoc method
         * @name bbc.navigation.$bbcNavigation#$get
         * @methodOf bbc.navigation.$bbcNavigation
         *
         * @description
         * Get instance of navigation
         *
         * @param {object} $bbcTransport The transport layer
         * @returns {object} The current transport provider
         */
        this.$get = function ($bbcTransport) {
            var pub = {};

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getApp
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets the current app.
             *
             * @returns {object} The current app.
             */
            pub.getApp = function () {
                return app;
            };

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getRoute
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets the current app route.
             *
             * @returns {object} The current app route.
             */
            pub.getRoute = function () {
                return route;
            };

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getTree
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets the navigation tree.
             *
             * @param {function(error, data) } callback The callback function.
             */
            pub.getTree = function (callback) {
                $bbcTransport.emit('/api/navigation/getTree',{current: app}, callback);
            };

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getList
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets the navigation flat list.
             *
             * @param {function(error, data) } callback The callback function.
             */
            pub.getList = function (callback) {
                $bbcTransport.emit('/api/navigation/getList',{current: app}, callback);
            };

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getTopList
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets the toplevel of navigation.
             *
             * @param {function(error, data) } callback The callback function.
             */
            pub.getTopList = function (callback) {
                $bbcTransport.emit('/api/navigation/getTopList',{current: app}, callback);
            };

            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getSubTree
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Gets all sub links from application as tree.
             *
             * @param {function(error, data) } callback The callback function.
             */
            pub.getSubTree = function (callback) {
                $bbcTransport.emit('/api/navigation/getSubTree',{current: app, top: route}, callback);
            };


            /**
             * @ngdoc method
             * @name bbc.navigation.$bbcNavigation#getSubList
             * @methodOf bbc.navigation.$bbcNavigation
             *
             * @description
             * Get all sub links from application as list.
             *
             * @param {function(error, data) } callback The callback function.
             */
            pub.getSubList = function (callback) {
                $bbcTransport.emit('/api/navigation/getSubList',{current: app, top: route}, callback);
            };

            return pub;
        };
    });
