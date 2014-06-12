var modalMock = {
    result: {
        then: function (confirmCallback, cancelCallback) {
            // Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
            this.confirmCallBack = confirmCallback;
            this.cancelCallback = cancelCallback;
        }
    },
    close: function (item) {
        // The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
        this.result.confirmCallBack(item);
    },
    dismiss: function (type) {
        // The user clicked cancel on the modal dialog, call the stored cancel callback
        this.result.cancelCallback(type);
    }
};

var callObjectMock = {
    cbOk: function () { },
    cbClose: function () { },
    cbYes: function () { },
    cbNo: function () { }
};

var emptyFunctionMock = function() {};

var io = {
    connect: function () {
        return {
            _listeners: {},
            on: function (ev, fn) {
                this._listeners[ev] = fn;
            },
            emit: function (ev, data) {
                return (this._listeners[ev] || angular.noop)(data);
            },
            removeListener: function (ev) {
                delete this._listeners[ev];
            }
        };
    }
};
