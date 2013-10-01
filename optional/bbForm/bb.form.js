/*global angular*/
angular.module('bb.form', [])
    // form service with cache
    .factory('bbForm', ['bbCache', function (bbCache) {
        return function (modelName, key) {
            var pub = {},
                master = {};

            // the form data
            pub.model = {};

            /**
             * Resets the model to the master.
             *
             * @param {object} form The angularjs formcontroller.
             */
            pub.reset = function (form) {
                if (form) {
                    // clear form errors
                    form.errors = {};
                }

                // reset model
                pub.model = angular.copy(master);

                if (key) {
                    // reset model in lxCache
                    if (pub.model[key]) {
                        bbCache[pub.model[key]] = pub.model;
                    } else {
                        bbCache[modelName] = pub.model;
                    }
                }
            };

            /**
             * Checks if the model has changes.
             *
             * @returns {boolean}
             */
            pub.isUnchanged = function () {
                return angular.equals(pub.model, master);
            };

            /**
             * Tries to load the model from lxCache.
             *
             * @param {string=} key The key of the model.
             * @returns {boolean}
             */
            pub.hasLoadedModelFromCache = function (key) {
                if (key && bbCache[key]) {
                    // load from lxCache
                    pub.model = bbCache[key];

                    if (bbCache[key + '_Master']) {
                        // load master from lxCache
                        master = bbCache[key + '_Master'];
                    }

                    return true;
                } else if (!key) {
                    if (bbCache[modelName]) {
                        // load from lxCache
                        pub.model = bbCache[modelName];
                    } else {
                        // set lxCache
                        bbCache[modelName] = pub.model;
                    }

                    return true;
                }

                return false;
            };

            /**
             * Sets the model.
             *
             * @param {object} model The model.
             * @param {boolean} resetCache Specifies if the lxCache should be resettet.
             */
            pub.setModel = function (model, resetCache) {
                if (!pub.model[key] && resetCache) {
                    // no key -> create, delete model from lxCache
                    delete bbCache[modelName];
                }

                // set model
                pub.model = model;
                master = angular.copy(model);

                if (resetCache) {
                    // reset lxCache
                    delete bbCache[model[key]];
                    delete bbCache[model[key] + '_Master'];
                } else {
                    // set lxCache
                    bbCache[model[key]] = pub.model;
                    bbCache[model[key] + '_Master'] = master;
                }
            };

            /**
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
    }]);