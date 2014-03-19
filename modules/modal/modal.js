'use strict';

angular.module('bbc.modal', ['modal/msgBox.html'])
    .controller('BbcModalCtrl', function ($rootScope, $scope, $modalInstance, modalOptions) {

        $scope.modalOptions = modalOptions;

        $rootScope.$on($scope.modalOptions.msgId, function (ev, mass) {
            $scope.$apply(function () {
                $scope.modalOptions.message = mass;
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

        $scope.reset = function () {
            if ($modalInstance) {
                $modalInstance.dismiss('cancel');
            }
        };

        /** Executes the YES action and closes the modal window */
        $scope.modalOptions.yes = function () {
            if (typeof $scope.modalOptions.actionYes === 'function') {
                $scope.modalOptions.actionYes.call();
            }
            $scope.reset();
        };

        /** Executes the NO action and closes the modal window */
        $scope.modalOptions.no = function () {
            if (typeof $scope.modalOptions.actionNo === 'function') {
                $scope.modalOptions.actionNo.call();
            }
            $scope.reset();
        };

        /** Executes the OK action and closes the modal window */
        $scope.modalOptions.ok = function () {
            if (typeof $scope.modalOptions.actionOk === 'function') {
                $scope.modalOptions.actionOk.call();
            }
            $scope.reset();
        };

        /** Executes the CLOSE action and closes the modal window */
        $scope.modalOptions.close = function () {
            if (typeof $scope.modalOptions.actionOk === 'function') {
                $scope.modalOptions.actionClose.call();
            }
            $scope.reset();
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
     */
    .service('$bbcModal', function ($rootScope, $modal) {
        var pub = {};

        /**
         * @ngdoc method
         * @name bbc.modal.$bbcModal#updateMsg
         * @methodOf bbc.modal.$bbcModal
         *
         * @description
         * Updates a message on an open modal window.
         *
         * @param {string} id The id of the modal window.
         * @param {string} message The message which should update.
         */
        pub.updateMsg = function (id, message) {
            $rootScope.$emit(id, message);
        };

        /**
         * @ngdoc method
         * @name bbc.modal.$bbcModal#msgBox
         * @methodOf bbc.modal.$bbcModal
         *
         * @description
         * Opens the modal window.
         *
         * @param {object} options An object with headline , message , message type, callback action when click the ok button in the modal window object with multiple callbacks,
         *                         an optional css class to manipulate the msgbox style and the button text values.
         */
        pub.msgBox = function (options) {
            var self = this;

            var modalOptions = {
                msgId: options.id,
                headline: options.headline,
                message: options.message,
                type: options.type,
                callObj: options.callObj,
                cssClass: options.cssClass,
                buttonTextValues: options.buttonTextValues
            };

            self.modalInstance = $modal.open({
                backdrop: options.backdrop,
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
         * @name bbc.modal.$bbcModal#reset
         * @methodOf bbc.modal.$bbcModal
         *
         * @description
         * Closes the modal window.
         *
         */
        pub.reset = function () {
            this.modalInstance.dismiss('cancel');
        };

        return pub;
    });
