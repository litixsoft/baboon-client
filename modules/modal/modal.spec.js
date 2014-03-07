'use strict';

describe('bbcModal', function () {
    var scope, service;
/*    var fakeModal = {
        result: {
            then: function (confirmCallback, cancelCallback) {
                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
            }
        },
        close: function (item) {
            //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
            this.result.confirmCallBack(item);
        },
        dismiss: function (type) {
            //The user clicked cancel on the modal dialog, call the stored cancel callback
            this.result.cancelCallback(type);
        }
    };*/

    beforeEach(module('bbc.alert'));
    beforeEach(module('ui.bootstrap.modal'));
    beforeEach(module('bbc.modal'));

    beforeEach(inject(function ($injector, $modal, $rootScope) {
        scope = $rootScope;
        //spyOn($modal, 'open').andReturn(fakeModal);
        service = $injector.get('bbcModal');
    }));

    it('should be initialized correctly ', function () {
        expect(typeof service).toBe('object');
        expect(typeof service.updateMsg).toBe('function');
        expect(typeof service.msgBox).toBe('function');
        expect(typeof service.reset).toBe('function');
    });

/*
    it('should be open', function () {
        service.msgBox ({message: 'Test'});
    });
*/

    it('should be call reset', function () {
        //scope.on('testMsg')
        spyOn(scope, '$emit');
        service.updateMsg('test', 'testMsg');
        expect(scope.$emit).toHaveBeenCalledWith('test', 'testMsg');
    });
});

