'use strict';

describe('bbcDatepicker', function () {
    var element, compile, scope;

    beforeEach(module('bbc.datepicker'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;

        // init scope
        scope = $rootScope.$new();
        scope.date2 = null;

        // create pager element
//        element = angular.element('<bbc-pager count="count" page-sizes="{{ pageSizes }}" on-paging="getData(pagingOptions)"></bbc-pager>');
        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker="\'MM/dd/yyyy\'" required="" placeholder="MM/dd/yyyy">');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should be initialized correctly', function () {
        expect(scope.date2).toBeNull();
    });

//    it('should be same date', function () {
////        scope.date2 = new Date(2012,4,23);
//
//        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker="\'MM/dd/yyyy\'" required="" placeholder="MM/dd/yyyy">');
//        element.val = '04/23/2000';
//        compile(element)(scope);
//        scope.$digest();
////        scope.getInput();
//        expect(scope.date2).toBe(new Date(2000,3,23));
//    });

});
