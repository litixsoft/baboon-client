'use strict';

describe('bbcModal', function () {
    describe('bbcModal service', function () {
        var rootScope, service;
        var fakeModal = modalMock;

        beforeEach(module('ui.bootstrap'));
        beforeEach(module('bbc.modal'));

        beforeEach(inject(function ($injector, $modal, $rootScope) {
            rootScope = $rootScope;
            spyOn($modal, 'open').andReturn(fakeModal);
            service = $injector.get('bbcModal');
        }));

        it('should be initialized correctly ', function () {
            expect(typeof service).toBe('object');
            expect(typeof service.updateMsg).toBe('function');
            expect(typeof service.msgBox).toBe('function');
            expect(typeof service.reset).toBe('function');
        });

        it('should be call updateMsg', function () {
            spyOn(rootScope, '$emit');
            service.updateMsg('test', 'testMsg');
            expect(rootScope.$emit).toHaveBeenCalledWith('test', 'testMsg');
        });

        it('should be call reset', function () {
            spyOn(fakeModal, 'dismiss');
            service.msgBox({message: 'Test'});
            service.reset();
            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });
    });

    describe('bbcModal controller', function () {
        var scope, rootScope, ctrl, modalOptions, modalInstance, popUpOptions;
        beforeEach(module('ui.bootstrap'));
        beforeEach(module('bbc.modal'));

        beforeEach(inject(function ($controller, $modal, $rootScope) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            popUpOptions = {
                backdrop: false,
                modalFade: true,
                controller: 'BbcModalCtrl',
                windowClass: 'bbc-modal-msg',
                resolve: {
                    modalOptions: function () { return {}; }
                },
                keyboard: false,
                templateUrl: 'modal/msgBox.html'
            };

            modalInstance = $modal.open(popUpOptions);

            modalOptions = {
                msgId: 'modalExamplePopup',
                callObj: callObjectMock
            };

            ctrl = $controller('BbcModalCtrl', {$rootScope: rootScope, $scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
        }));

        it('should be initialized correctly ', function () {
            expect(typeof scope.modalOptions).toBe('object');
            expect(typeof scope.modalOptions.yes).toBe('function');
            expect(typeof scope.modalOptions.no).toBe('function');
            expect(typeof scope.modalOptions.ok).toBe('function');
            expect(typeof scope.modalOptions.close).toBe('function');
            expect(typeof scope.reset).toBe('function');
        });

        it('should be reset called if yes is clicked', function () {
            spyOn(scope, 'reset');
            spyOn(scope.modalOptions, 'actionYes');
            scope.modalOptions.yes();
            expect(scope.reset).toHaveBeenCalled();
            expect(scope.modalOptions.actionYes).toHaveBeenCalled();
        });

        it('should be reset called if yes is clicked and no actionYes function is specified', inject(function ($controller) {
            modalOptions = {};
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            spyOn(scope, 'reset');
            scope.modalOptions.yes();
            expect(scope.reset).toHaveBeenCalled();
        }));

        it('should be reset called if no is clicked', function () {
            spyOn(scope, 'reset');
            spyOn(scope.modalOptions, 'actionNo');
            scope.modalOptions.no();
            expect(scope.reset).toHaveBeenCalled();
            expect(scope.modalOptions.actionNo).toHaveBeenCalled();
        });

        it('should be reset called no yes is clicked and no actionNo function is specified', inject(function ($controller) {
            modalOptions = {};
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            spyOn(scope, 'reset');
            scope.modalOptions.no();
            expect(scope.reset).toHaveBeenCalled();
        }));

        it('should be reset called if ok is clicked', function () {
            spyOn(scope, 'reset');
            spyOn(scope.modalOptions, 'actionOk');
            scope.modalOptions.ok();
            expect(scope.reset).toHaveBeenCalled();
            expect(scope.modalOptions.actionOk).toHaveBeenCalled();
        });

        it('should be reset called no yes is clicked and no actionOk function is specified', inject(function ($controller) {
            modalOptions = {};
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            spyOn(scope, 'reset');
            scope.modalOptions.ok();
            expect(scope.reset).toHaveBeenCalled();
        }));

        it('should be reset called if close is clicked', function () {
            spyOn(scope, 'reset');
            spyOn(scope.modalOptions, 'actionClose');
            scope.modalOptions.close();
            expect(scope.reset).toHaveBeenCalled();
            expect(scope.modalOptions.actionClose).toHaveBeenCalled();
        });

        it('should be reset called no yes is clicked and no actionClose function is specified', inject(function ($controller) {
            modalOptions = {};
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            spyOn(scope, 'reset');
            scope.modalOptions.close();
            expect(scope.reset).toHaveBeenCalled();
        }));

        it('should be reset called no yes is clicked and no actionClose function is specified', inject(function ($controller) {
            modalOptions = {};
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            spyOn(scope, 'reset');
            scope.modalOptions.close();
            expect(scope.reset).toHaveBeenCalled();
        }));

        it('should be set to  ActionOk if callObj is of type funtion', inject(function ($controller) {
            modalOptions.callObj = callObjectMock.cbOk;
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: modalInstance, modalOptions: modalOptions});
            expect(typeof scope.modalOptions.actionOk).toBe('function');
        }));

        it('should be call reset', function () {
            spyOn(modalInstance, 'dismiss');
            scope.reset();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should be call reset but not dismiss on modelInstance', inject(function ($controller) {
            ctrl = $controller('BbcModalCtrl', {$scope: scope, $modalInstance: null, modalOptions: modalOptions});
            spyOn(modalInstance, 'dismiss');
            scope.reset();
            expect(modalInstance.dismiss).not.toHaveBeenCalled();
        }));

        it('should be trigger rootScope on event', function () {
            spyOn(rootScope, '$on').andCallThrough();
            rootScope.$emit('modalExamplePopup', 'unit test');
            expect(rootScope.$on).toHaveBeenCalled();
            expect(scope.modalOptions.message).toBe('unit test');
        });

        it('should be call resolve from modal.open config', inject(function ($injector) {
            var service = $injector.get('bbcModal');
            service.msgBox({});
        }));
    });
});

