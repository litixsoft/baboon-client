/*global angular*/
angular.module('lx.modal.directives',[])
    .directive('draggable',['$document', function($document) {
        return function(scope, element, attr) {

            var modalWindow = element.parent();

            var startX = 0, startY = 0, x = 0, y = 0, modalX = 0, modalY = 0;
            modalWindow.css({
                cursor: 'pointer'
            });

            element.bind('mousedown',function(event){
                // Prevent default dragging of selected content
                event.preventDefault();

                startX = event.screenX;
                startY = event.screenY;

                var modalpos = offset(modalWindow);
                modalX = modalpos.left + 280;
                modalY = modalpos.top;

                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
            });

            function offset(elm) {
//                try {return elm.offset();} catch(e) {}
                var rawDom = elm[0];
                var _x = 0;
                var _y = 0;
                var body = document.documentElement || document.body;
                var scrollX = window.pageXOffset || body.scrollLeft;
                var scrollY = window.pageYOffset || body.scrollTop;
                _x = rawDom.getBoundingClientRect().left + scrollX;
                _y = rawDom.getBoundingClientRect().top + scrollY;
                return { left: _x, top:_y };
            }

            function mousemove(event) {
                modalWindow.css({
                    opacity: '0.4'
                });
                y = event.screenY - startY;
                x = event.screenX - startX;

                modalWindow.css({
                    top: ( modalY + y ) + 'px',
                    left: ( modalX + x ) + 'px'
                });
            }

            function mouseup() {
                modalWindow.css({
                    opacity: '1'
                });
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    }])
    .directive('bbMsgbox', ['$rootScope','lxModal', function ($rootScope, lxModal){
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
                        lxModal.msgBox(scope.msgHeadline,scope.msgMessage,scope.msgType,scope.msgCbs,scope.msgClass);
                    }
                });
            }
        };
    }]);
