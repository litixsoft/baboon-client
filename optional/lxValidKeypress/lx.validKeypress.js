/*global angular*/
angular.module('lx.validKeypress', [])
    .directive('lxValidKeypress',function(){
        return {
            restrict: 'A',
            scope: {
                lxValidKeypress: '='
            },
            link: function (scope, elm) {

                var index = 0;

                function searchParent(element){
                    index++;

                    var parent = element.parent();

                    if(parent.hasClass('has-error')){
                        parent.removeClass('has-error');
                    } else {
                        if(index<10){
                            searchParent(parent);
                        }
                    }
                };

                elm.bind('keypress', function() {
                    if(scope.lxValidKeypress){

                        searchParent(elm);

                    }
                });
            }
        };
    })

