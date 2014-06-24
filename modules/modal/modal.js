'use strict';

angular.module('bbc.modal', ['modal/msgBox.html'])
    .controller('BbcModalCtrl', function ($rootScope, $scope, $modalInstance, modalOptions) {

        $scope.modalOptions = modalOptions;

        $rootScope.$on($scope.modalOptions.msgId, function (ev, msg) {
            $scope.$apply(function () {
                $scope.modalOptions.message = msg;
            });
        });

        if (typeof($scope.modalOptions.callObj) === 'function') {
            $scope.modalOptions.actionOk = $scope.modalOptions.callObj;
        }
        else if (typeof($scope.modalOptions.callObj) === 'object') {
            $scope.modalOptions.actionOk = $scope.modalOptions.callObj.cbOk;
            $scope.modalOptions.actionClose = $scope.modalOptions.callObj.cbClose;
            $scope.modalOptions.actionYes = $scope.modalOptions.callObj.cbYes;
            $scope.modalOptions.actionNo = $scope.modalOptions.callObj.cbNo;
        }

        $scope.cancel = function () {
            if ($modalInstance) {
                $modalInstance.dismiss('cancel');
            }
        };

        /** Executes the YES action and closes the modal window */
        $scope.modalOptions.yes = function () {
            if (typeof $scope.modalOptions.actionYes === 'function') {
                $scope.modalOptions.actionYes.call();
            }
            $scope.cancel ();
        };

        /** Executes the NO action and closes the modal window */
        $scope.modalOptions.no = function () {
            if (typeof $scope.modalOptions.actionNo === 'function') {
                $scope.modalOptions.actionNo.call();
            }
            $scope.cancel ();
        };

        /** Executes the OK action and closes the modal window */
        $scope.modalOptions.ok = function () {
            if (typeof $scope.modalOptions.actionOk === 'function') {
                $scope.modalOptions.actionOk.call();
            }
            $scope.cancel ();
        };

        /** Executes the CLOSE action and closes the modal window */
        $scope.modalOptions.close = function () {
            if (typeof $scope.modalOptions.actionOk === 'function') {
                $scope.modalOptions.actionClose.call();
            }
            $scope.cancel ();
        };
    })
    /**
     * @ngdoc service
     * @name bbc.modal.$bbcModal
     * @requires $rootScope
     * @requires $modal
     *
     * @description
     * Service displaying a modal popup window.
     *
     * For more details see our {@link /modal Guide}.
     *
     */
    .service('$bbcModal', function ($rootScope, $modal) {
        var pub = {};

        /**
         * @ngdoc method
         * @name bbc.modal.$bbcModal#update
         * @methodOf bbc.modal.$bbcModal
         *
         * @description
         * Updates a message on an open modal window.
         *
         * @param {string} id The id of the modal window.
         * @param {string} message The message which should update.
         */
        pub.update = function (id, message) {
            $rootScope.$emit(id, message);
        };

        /**
         * @ngdoc method
         * @name bbc.modal.$bbcModal#open
         * @methodOf bbc.modal.$bbcModal
         * @param {object} options An object for configuration.
         * @param {string} options.id An unique identifier.
         * @param {string} options.headline The headline of the modal window.
         * @param {string} options.message The message of the modal window.
         * @param {object|function} options.callObj A function with a callback for the ok button or an object with different callbacks for different buttons, which are called on button click.
         *                                          The callbacks determine which buttons are displayed. Possible values for the object: cbOk, cbClose, cbYes and cbNo.
         * @param {object} options.buttonTextValues An object with display values for the buttons.
         *
         * @description
         * Opens the modal window.
         *
         */
        pub.open = function (options) {
            var self = this;

            var modalOptions = {
                msgId: options.id,
                headline: options.headline,
                message: options.message,
                callObj: options.callObj,
                buttonTextValues: options.buttonTextValues
            };

            self.modalInstance = $modal.open({
                backdrop: options.backdrop || true,
                modalFade: true,
                controller: 'BbcModalCtrl',
                windowClass: 'bbc-modal-msg',
                resolve: {
                    modalOptions: function () { return modalOptions; }
                },
                keyboard: false,
                templateUrl: 'modal/msgBox.html'
            });
        };

        /**
         * @ngdoc method
         * @name bbc.modal.$bbcModal#cancel
         * @methodOf bbc.modal.$bbcModal
         *
         * @description
         * Closes the modal window.
         *
         */
        pub.cancel = function () {
            this.modalInstance.dismiss('cancel');
        };

        return pub;
    });
