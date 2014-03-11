'use strict';

angular.module('bbc.form', [])
    // form service with cache
    .factory('bbcForm', function (bbcCacheSrv) {
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

                    // set form to pristine state
                    form.$setPristine();
                }

                // reset model
                pub.model = angular.copy(master);

                if (key) {
                    // reset model in bbcCacheSrv
                    if (pub.model[key]) {
                        bbcCacheSrv[pub.model[key]] = pub.model;
                    } else {
                        bbcCacheSrv[modelName] = pub.model;
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
             * Tries to load the model from bbcCacheSrv.
             *
             * @param {string=} key The key of the model.
             * @returns {boolean}
             */
            pub.hasLoadedModelFromCache = function (key) {
                if (key && bbcCacheSrv[key]) {
                    // load from bbcCacheSrv
                    pub.model = bbcCacheSrv[key];

                    if (bbcCacheSrv[key + '_Master']) {
                        // load master from bbcCacheSrv
                        master = bbcCacheSrv[key + '_Master'];
                    }

                    return true;
                } else if (!key) {
                    if (bbcCacheSrv[modelName]) {
                        // load from bbcCacheSrv
                        pub.model = bbcCacheSrv[modelName];
                    } else {
                        // set bbcCacheSrv
                        bbcCacheSrv[modelName] = pub.model;
                    }

                    return true;
                }

                return false;
            };

            /**
             * Sets the model.
             *
             * @param {object} model The model.
             * @param {boolean} resetCache Specifies if the bbcCacheSrv should be reset.
             */
            pub.setModel = function (model, resetCache) {
                if (!pub.model[key] && resetCache) {
                    // no key -> create, delete model from bbcCacheSrv
                    delete bbcCacheSrv[modelName];
                }

                // set model
                pub.model = model;
                master = angular.copy(model);

                if (resetCache) {
                    // reset bbcCacheSrv
                    delete bbcCacheSrv[model[key]];
                    delete bbcCacheSrv[model[key] + '_Master'];
                } else {
                    // set bbcCacheSrv
                    bbcCacheSrv[model[key]] = pub.model;
                    bbcCacheSrv[model[key] + '_Master'] = master;
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
    });