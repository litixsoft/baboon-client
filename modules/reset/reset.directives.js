'use strict';

angular.module('bbc.reset.directives', [])
    .value('bbcResetConfig', null)
    .directive('bbcReset', function (bbcResetConfig) {
        var resetValue = null;
        if (bbcResetConfig !== undefined){
            resetValue = bbcResetConfig;
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
    });