'use strict';

describe('bbcReset', function () {
    var scope, element, compile;

    beforeEach(module('bbc.reset'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
    }));

    describe('only allowed for input', function () {

        it('should throw an error on button tag', function () {
            element = angular.element('<button class="form-control" ng-model="test" bbc-reset></button>');
            expect(function () {
                compile(element)(scope);
            }).toThrow(new Error('resetField is limited to input elements'));
        });

        it('should throw an error on textarea tag', function () {
            element = angular.element('<textarea class="form-control" ng-model="test" bbc-reset></textarea>');
            expect(function () {
                compile(element)(scope);
            }).toThrow(new Error('resetField is limited to input elements'));
        });
    });

    describe('only allowed for certain input types', function () {
        describe('valid types', function () {
            it('should not throw an error on input type text', function () {
                element = angular.element('<input type="text" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: text'));
            });

            it('should not throw an error on input type search', function () {
                element = angular.element('<input type="search" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: search'));
            });

            it('should not throw an error on input type tel', function () {
                element = angular.element('<input type="tel" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: tel'));
            });

            it('should not throw an error on input type url', function () {
                element = angular.element('<input type="url" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: url'));
            });

            it('should not throw an error on input type email', function () {
                element = angular.element('<input type="email" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: email'));
            });

            it('should not throw an error on input type password', function () {
                element = angular.element('<input type="password" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).not.toThrow(new Error('Invalid input type for resetField: password'));
            });
        });

        describe('invalid types', function () {
            it('should throw an error on input type button', function () {
                element = angular.element('<input type="button" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: button'));
            });

            it('should throw an error on input type checkbox', function () {
                element = angular.element('<input type="checkbox" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: checkbox'));
            });

            it('should throw an error on input type color', function () {
                element = angular.element('<input type="color" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: color'));
            });

            it('should throw an error on input type date', function () {
                element = angular.element('<input type="date" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: date'));
            });

            it('should throw an error on input type datetime', function () {
                element = angular.element('<input type="datetime" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: datetime'));
            });

            it('should throw an error on input type datetime-local', function () {
                element = angular.element('<input type="datetime-local" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: datetime-local'));
            });

            it('should throw an error on input type file', function () {
                element = angular.element('<input type="file" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: file'));
            });

            it('should throw an error on input type hidden', function () {
                element = angular.element('<input type="hidden" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: hidden'));
            });

            it('should throw an error on input type image', function () {
                element = angular.element('<input type="image" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: image'));
            });

            it('should throw an error on input type month', function () {
                element = angular.element('<input type="month" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: month'));
            });

            it('should throw an error on input type number', function () {
                element = angular.element('<input type="number" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: number'));
            });

            it('should throw an error on input type radio', function () {
                element = angular.element('<input type="radio" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: radio'));
            });

            it('should throw an error on input type range', function () {
                element = angular.element('<input type="range" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: range'));
            });

            it('should throw an error on input type reset', function () {
                element = angular.element('<input type="reset" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: reset'));
            });

            it('should throw an error on input type submit', function () {
                element = angular.element('<input type="submit" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: submit'));
            });

            it('should throw an error on input type time', function () {
                element = angular.element('<input type="time" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: time'));
            });

            it('should throw an error on input type week', function () {
                element = angular.element('<input type="week" class="form-control" ng-model="test" bbc-reset />');
                expect(function () {
                    compile(element)(scope);
                }).toThrow(new Error('Invalid input type for resetField: week'));
            });
        });
    });

    describe('element tests', function () {
        beforeEach(inject(function () {
            element = angular.element('<input type="text" class="form-control" ng-model="test" bbc-reset />');
            compile(element)(scope);
            scope.$digest();
        }));

        it('should call reset()', inject(function ($timeout) {
            scope.test = 'test value';
            scope.$digest();
            expect(element.val()).toBe('test value');
            var elementScope = element.isolateScope();
            elementScope.reset();
            $timeout.flush();
            expect(element.val()).toBe('');
        }));

        it('should be enabled = false after trigger focus handler', function () {
            var elementScope = element.isolateScope();
            element.triggerHandler('focus');
            expect(elementScope.enabled).toBeFalsy();
        });

        it('should be enabled = true after trigger focus handler', function () {
            scope.test = 'test value';
            scope.$digest();
            var elementScope = element.isolateScope();
            element.triggerHandler('focus');
            expect(elementScope.enabled).toBeTruthy();
        });

        it('should be enabled = false after input focus handler', function () {
            var elementScope = element.isolateScope();
            element.triggerHandler('input');
            expect(elementScope.enabled).toBeFalsy();
        });

        it('should be enabled = true after trigger input handler', function () {
            scope.test = 'test value';
            scope.$digest();
            var elementScope = element.isolateScope();
            element.triggerHandler('input');
            expect(elementScope.enabled).toBeTruthy();
        });
    });
});