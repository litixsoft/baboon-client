/*global angular*/
angular.module('bb.modal.directives',[]) //
    .directive('bbModalMsgbox', ['$rootScope','bbModal', function ($rootScope, bbModal){
        return {
            restrict: 'E,A',
            scope: {
                msgHeadline: '=',
                msgType: '=',
                msgMessage: '=',
                msgShow: '=',
                msgCbs: '=',
                msgClass: '='
            },
            link: function (scope) {

                scope.$watch('msgShow',function(value){
                    //if visible use factory to show msgbox
                    if(value){
                        bbModal.msgBox(scope.msgHeadline,scope.msgMessage,scope.msgType,scope.msgCbs,scope.msgClass);
                    }
                });
            }
        };
    }]);
