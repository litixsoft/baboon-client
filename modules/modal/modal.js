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
    .service('bbcModal', function ($rootScope, $modal) {
        /**
         * Opens the modal window.
         *
         * @param {string} headline The headline to show.
         * @param {string} message The message to show.
         * @param {string=} type The message type.
         * @param {function=} callback The callback action when click the ok button in the modal window OR {object=} object with multible callbacks
         * @param {string=} cssClass an optinal css class to manipulate the msgbox style
         */

        var pub = {};

        pub.updateMsg = function (id, message) {
            $rootScope.$emit(id, message);
        };

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

        pub.reset = function () {
            this.modalInstance.dismiss('cancel');
        };

        return pub;
    });
