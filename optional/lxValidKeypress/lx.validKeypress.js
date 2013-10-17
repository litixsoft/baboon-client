/*global angular*/
angular.module('lx.validKeypress', [])
    .directive('lxValidKeypress',function(){
        return {
            restrict: 'A',
            scope: {
                lxValidKeypress: '='
            },
            link: function (scope, elm, attr) {
                elm.bind('keypress', function() {
                    if(scope.lxValidKeypress){
                        scope.$apply(function() {
                            scope.lxValidKeypress = false;
                        });
                    }
                });
            }
        };
    })

