'use strict';

angular.module('bbc.form', [])
    /**
     * @ngdoc object
     * @name bbc.form.$bbcForm
     * @requires bbc.cache.$bbcCache
     *
     * @description
     * Form service which allow caching, reset the object and populates validation errors.
     *
     */
    .factory('$bbcForm', function ($bbcCache) {
        return function (modelName, key) {
            var pub = {},
                master = {};

            // the form data
            pub.model = {};

            /**
             * @ngdoc method
             * @name bbc.form.$bbcForm#reset
             * @methodOf bbc.form.$bbcForm
             *
             * @description
             * Resets the model to the master.
             *
             * @param {object} form The angularjs form controller.
             */
            pub.reset = function (form) {
                if (form) {
                    // clear form errors
                    form.errors = {};

                    // set form to pristine state
                    form.$setPristine();
                }

                // reset model
                pub.model = angular.copy(master);

                if (key) {
                    // reset model in $bbcCache
                    if (pub.model[key]) {
                        $bbcCache[pub.model[key]] = pub.model;
                    } else {
                        $bbcCache[modelName] = pub.model;
                    }
                }
            };

            /**
             * @ngdoc method
             * @name bbc.form.$bbcForm#isUnchanged
             * @methodOf bbc.form.$bbcForm
             *
             * @description
             * Checks if the model has changes.
             *
             * @returns {boolean} true if model is unchanged, otherwise false.
             */
            pub.isUnchanged = function () {
                return angular.equals(pub.model, master);
            };

            /**
             * @ngdoc method
             * @name bbc.form.$bbcForm#hasLoadedModelFromCache
             * @methodOf bbc.form.$bbcForm
             *
             * @description
             * Tries to load the model from $bbcCache.
             *
             * @param {string=} key The key of the model.
             * @returns {boolean} true if model has loaded from cache, otherwise false.
             */
            pub.hasLoadedModelFromCache = function (key) {
                if (key && $bbcCache[key]) {
                    // load from $bbcCache
                    pub.model = $bbcCache[key];

                    if ($bbcCache[key + '_Master']) {
                        // load master from $bbcCache
                        master = $bbcCache[key + '_Master'];
                    }

                    return true;
                } else if (!key) {
                    if ($bbcCache[modelName]) {
                        // load from $bbcCache
                        pub.model = $bbcCache[modelName];
                    } else {
                        // set $bbcCache
                        $bbcCache[modelName] = pub.model;
                    }

                    return true;
                }

                return false;
            };

            /**
             * @ngdoc method
             * @name bbc.form.$bbcForm#setModel
             * @methodOf bbc.form.$bbcForm
             *
             * @description
             * Sets the model.
             *
             * @param {object} model The model.
             * @param {boolean} resetCache Specifies if the $bbcCache should be reset.
             */
            pub.setModel = function (model, resetCache) {
                if (!pub.model[key] && resetCache) {
                    // no key -> create, delete model from $bbcCache
                    delete $bbcCache[modelName];
                }

                // set model
                pub.model = model;
                master = angular.copy(model);

                if (resetCache) {
                    // reset $bbcCache
                    delete $bbcCache[model[key]];
                    delete $bbcCache[model[key] + '_Master'];
                } else {
                    // set $bbcCache
                    $bbcCache[model[key]] = pub.model;
                    $bbcCache[model[key] + '_Master'] = master;
                }
            };

            /**
             * @ngdoc method
             * @name bbc.form.$bbcForm#populateValidation
             * @methodOf bbc.form.$bbcForm
             *
             * @description
             * Add server validation to form.
             *
             * @param {object} form The angularjs form controller.
             * @param {array} errors The validation errors.
             */
            pub.populateValidation = function (form, errors) {
                if (errors) {
                    // reset form errors
                    form.errors = {};

                    for (var i = 0; i < errors.length; i++) {
                        // set form errors
                        form.errors[errors[i].property] = errors[i].message;
                    }
                }
            };

            return pub;
        };
    });