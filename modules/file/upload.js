'use strict';

angular.module('bbc.file', [])
    .directive('bbcFileUpload', function () {
        return {
            scope: {
                onFilesSelected: '&'
            },
            link: function (scope, element) {
                element.bind('change', function (event) {
                    var files = event.target.files,
                        length = files.length,
                        result = [];

                    if (typeof scope.onFilesSelected === 'function') {
                        // iterate files since 'multiple' may be specified on the element
                        for (var i = 0; i < length; i++) {
                            result.push(files[i]);
                        }

                        scope.$apply(function () {
                            scope.onFilesSelected({files: result});
                        });
                    }
                });
            }
        };
    });