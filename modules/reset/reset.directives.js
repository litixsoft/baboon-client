/*global angular*/
angular.module('lx.reset.directives', [])
    .value('lxResetConfig',null)
    .directive('lxReset', ['lxResetConfig', function (lxResetConfig) {
        var resetValue = null;
        if (lxResetConfig !== undefined){
            resetValue = lxResetConfig;
        }
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var aElement;
                aElement = angular.element('<a class="ui-reset" />');
                elm.wrap('<span class="ui-resetwrap" />').after(aElement);
                aElement.bind('click', function (e) {
                    e.preventDefault();
                    scope.$apply(function () {
                        if (attrs.uiReset){
                            ctrl.$setViewValue(scope.$eval(attrs.uiReset));
                        }else{
                            ctrl.$setViewValue(resetValue);
                        }
                        ctrl.$render();
                    });
                });
            }
        };

    }]);
