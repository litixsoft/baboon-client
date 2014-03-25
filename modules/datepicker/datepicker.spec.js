'use strict';

describe('bbcDatepicker', function () {
    var element, compile, scope;

    beforeEach(module('bbc.datepicker'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        // init scope
        scope = $rootScope.$new();

        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker="\'MM/dd/yyyy\'" required="" placeholder="MM/dd/yyyy">');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should be initialized correctly', function () {
        var elementScope = element.isolateScope();
        expect(elementScope.dateFormat).toBe('MM/dd/yyyy');
    });

    it('should be initialized correctly using internal date format dd.MM.yyyy', function () {
        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker required="" placeholder="MM/dd/yyyy">');
        compile(element)(scope);
        scope.$digest();
        var elementScope = element.isolateScope();
        expect(elementScope.dateFormat).toBe('dd.MM.yyyy');
    });

    it('on visible set to true checkposition should be called', function () {
        var elementScope = element.isolateScope();
        spyOn(elementScope, 'checkPosition');
        elementScope.visible = true;
        scope.$digest();
        expect(elementScope.visible).toBeTruthy();
        expect(elementScope.checkPosition).toHaveBeenCalled();
    });

    it('on window resize checkposition should be called with element is visible', inject(function ($window) {
        var elementScope = element.isolateScope();
        elementScope.visible = true;
        scope.$digest();

        spyOn(elementScope, 'checkPosition');
        angular.element($window).triggerHandler('resize');
        expect(elementScope.checkPosition).toHaveBeenCalled();
    }));

    it('on window resize checkposition should be called with element is not visible', inject(function ($window) {
        var elementScope = element.isolateScope();
        elementScope.visible = false;
        scope.$digest();

        spyOn(elementScope, 'checkPosition');
        angular.element($window).triggerHandler('resize');
        expect(elementScope.checkPosition).not.toHaveBeenCalled();
    }));

    it('on window resize checkposition should be called and scope.off should be set', inject(function ($window) {
        var elementScope = element.isolateScope();
        elementScope.visible = true;
        scope.$digest();

//        $window.innerHeight = 0;

        spyOn(elementScope, 'checkPosition');

        angular.element($window).triggerHandler('resize');
        expect(elementScope.checkPosition).toHaveBeenCalled();
    }));

    it('getDivider() should return string with divider', function () {
        var elementScope = element.isolateScope();
        expect(elementScope.getDivider('yyyy-MM-dd')).toBe('-');
        expect(elementScope.getDivider('yyyy.MM.dd')).toBe('.');
        expect(elementScope.getDivider('yyyy/MM/dd')).toBe('/');
        expect(elementScope.getDivider('yyyy:MM:dd')).toBe(':');
    });

    it('validateDate() should return object with validation errors or result date', function () {
        var elementScope = element.isolateScope();
        //Attention: Time is set to 8 a clock, cause it is the directive internal hard set time
        elementScope.dateFormat = 'dd.MM.yyyy';
        //wrong day format
        expect(elementScope.validateDate('1.2004').result).toBe(null);
        expect(elementScope.validateDate('1.2004').error).toBe('format');

        //normal valid day and day format
        expect(elementScope.validateDate('1.2.2004').result).toEqual(new Date(2004,1,1,8,0));
        expect(elementScope.validateDate('1.2.2004').error).toBe(null);
        //special 29th February, exists in 2004
        expect(elementScope.validateDate('29.2.2004').result).toEqual(new Date(2004,1,29,8,0));
        expect(elementScope.validateDate('29.2.2004').error).toBe(null);
        //special 29th February, exists not in 2005
        expect(elementScope.validateDate('29.2.2005').result).toBe(null);
        expect(elementScope.validateDate('29.2.2005').error).toBe('day');

        elementScope.dateFormat = 'yyyy-MM-dd';
        //normal valid day and day format
        expect(elementScope.validateDate('2004-2-1').result).toEqual(new Date(2004,1,1,8,0));
        expect(elementScope.validateDate('2004-2-1').error).toBe(null);
        //special 29th February, exists in 2004
        expect(elementScope.validateDate('2004-2-29').result).toEqual(new Date(2004,1,29,8,0));
        expect(elementScope.validateDate('2004-2-29').error).toBe(null);
        //special 29th February, exists not in 2005
        expect(elementScope.validateDate('2005-2-29').result).toBe(null);
        expect(elementScope.validateDate('2005-2-29').error).toBe('day');

        elementScope.dateFormat = 'MM/dd/yyyy';
        //normal valid day and day format
        expect(elementScope.validateDate('2/1/2004').result).toEqual(new Date(2004,1,1,8,0));
        expect(elementScope.validateDate('2/1/2004').error).toBe(null);
        //special 29th February, exists in 2004
        expect(elementScope.validateDate('2/29/2004').result).toEqual(new Date(2004,1,29,8,0));
        expect(elementScope.validateDate('2/29/2004').error).toBe(null);
        //special 29th February, exists not in 2005
        expect(elementScope.validateDate('2/29/2005').result).toBe(null);
        expect(elementScope.validateDate('2/29/2005').error).toBe('day');

        elementScope.dateFormat = 'MM/MM/yyyy';
        // no day given
        expect(elementScope.validateDate('1/1/2004').result).toBe(null);
        expect(elementScope.validateDate('1/1/2004').error).toBe('format');
    });

    it('startScroll() schould start scrolling in direction, autoscroll should be true', function () {
        var elementScope = element.isolateScope();

        spyOn(elementScope, 'autoScrollFunc');

        elementScope.startScroll('up');
        expect(elementScope.autoScroll).toBeTruthy();
        expect(elementScope.autoScrollFunc).toHaveBeenCalled();

        elementScope.startScroll('down');
        expect(elementScope.autoScroll).toBeTruthy();
        expect(elementScope.autoScrollFunc).toHaveBeenCalled();
    });

    it('stopScroll() stops scrolling, autoscroll should be false', function () {
        var elementScope = element.isolateScope();

        elementScope.stopScroll();
        expect(elementScope.autoScroll).toBeFalsy();
    });

    it('autoScrollFunc() should be changing "scrollCont.scrollTop" when "autoScroll" is true', inject(function ($timeout) {
        var elementScope = element.isolateScope();
        var top = elementScope.scrollCont.scrollTop;

        elementScope.autoScroll = true;

        // up
        elementScope.autoScrollFunc('up');
        $timeout.flush();

        // down
        elementScope.autoScrollFunc('down');
        $timeout.flush();

        expect(elementScope.scrollCont.scrollTop).toBe(top);

        // unknown direction
        elementScope.autoScrollFunc('foo');
        $timeout.flush();

        expect(elementScope.scrollCont.scrollTop).toBe(top);
    }));

    it('autoScrollFunc() should not change "scrollCont.scrollTop" when "autoScroll" is false', inject(function ($timeout) {
        var elementScope = element.isolateScope();
        var top = elementScope.scrollCont.scrollTop;

        elementScope.autoScroll = false;
        elementScope.autoScrollFunc('up');

        $timeout.flush();

        expect(elementScope.scrollCont.scrollTop).toBe(top);
    }));

    it('yearClick() year be set for selectedDay and view updated ', function () {
        var elementScope = element.isolateScope();

        elementScope.selectedDay.setFullYear(2014);
        expect(elementScope.selectedDay.getFullYear()).toBe(2014);

        elementScope.yearClick(2005);
        elementScope.$digest();
        expect(elementScope.selectedDay.getFullYear()).toBe(2005);
    });

    it('monthClick() month be set for selectedDay and view updated ', function () {
        var elementScope = element.isolateScope();
        //month from 0 - 11
        elementScope.selectedDay.setMonth(6);
        expect(elementScope.selectedDay.getMonth()).toBe(6);

        elementScope.monthClick(3);
        elementScope.$digest();
        expect(elementScope.selectedDay.getMonth()).toBe(3);
    });

    it('dayClick() day be set for selectedDay and view updated ', function () {
        var elementScope = element.isolateScope();
        //set day normal
        var dayNumber = {
            in: true, //false if clicked day is in last or next month in button matrix
            nr: 13 //13th of the month
        };

        elementScope.selectedDay.setDate(6);
        expect(elementScope.selectedDay.getDate()).toBe(6);

        elementScope.dayClick(dayNumber);
        elementScope.$digest();
        expect(elementScope.selectedDay.getDate()).toBe(13);

        //set Day in next Month, so month has to be corrected with +1
        //if month is correct javascript date corrects year automatically
        elementScope.selectedDay.setMonth(6);
        expect(elementScope.selectedDay.getMonth()).toBe(6);

        var dayNumberOutLast = {  //day in last month was clicked
            in: false, //false if clicked day is in last or next month in button matrix
            nr: 7 //only possible < 10
        };

        elementScope.dayClick(dayNumberOutLast);
        elementScope.$digest();
        expect(elementScope.selectedDay.getDate()).toBe(7);
        expect(elementScope.selectedDay.getMonth()).toBe(7); //month-1

        //set Day in next Month, so month has to be corrected with +1
        //if month is correct javascript date corrects year automatically
        elementScope.selectedDay.setMonth(6);
        expect(elementScope.selectedDay.getMonth()).toBe(6);

        var dayNumberOutNext = {  //day in last month was clicked
            in: false, //false if clicked day is in last or next month in button matrix
            nr: 23 //only possible < 10
        };

        elementScope.dayClick(dayNumberOutNext);
        elementScope.$digest();
        expect(elementScope.selectedDay.getDate()).toBe(23);
        expect(elementScope.selectedDay.getMonth()).toBe(5); //month-1
    });

    it('getInput() should fill ngModel and valid object ', function () {

        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker="\'MM/dd/yyyy\'" required placeholder="MM/dd/yyyy">');
        compile(element)(scope);
        scope.$digest();

        var elementScope = element.isolateScope();
        elementScope.selectedDayShort = '';
        elementScope.getInput();
        expect(elementScope.valid.date).toBeTruthy();
        expect(elementScope.valid.required).toBeFalsy();

        element = angular.element('<input id="pick2" name="pick2" ng-model="date2" bbc-datepicker="\'MM/dd/yyyy\'" placeholder="MM/dd/yyyy">');
        compile(element)(scope);
        scope.$digest();

        elementScope = element.isolateScope();
        elementScope.selectedDayShort = '';
        elementScope.getInput();
        expect(elementScope.valid.date).toBeTruthy();
        expect(elementScope.valid.required).toBeTruthy();

        elementScope.selectedDayShort = '02/28/2004'; //format defined in element
        elementScope.getInput();
        expect(elementScope.validationObject.error).toBeFalsy();
        expect(elementScope.ngModel).toEqual(new Date(2004,1,28,8));
        expect(elementScope.valid.date).toBeTruthy();
        expect(elementScope.valid.required).toBeTruthy();
        expect(elementScope.valid.wrongdate).toBeTruthy();

        //--none existing day---
        elementScope.selectedDayShort = '02/32/2004';
        elementScope.getInput();
        expect(elementScope.validationObject.error).toBeTruthy();
        expect(elementScope.valid.required).toBeTruthy();
        expect(elementScope.validationObject.error).toBe('day');
        expect(elementScope.valid.date).toBeTruthy();
        expect(elementScope.valid.wrongdate).toBeFalsy();

        //--wrong format of date---
        elementScope.selectedDayShort = '02.2004';
        elementScope.getInput();
        expect(elementScope.validationObject.error).toBeTruthy();
        expect(elementScope.valid.required).toBeTruthy();
        expect(elementScope.valid.date).toBeFalsy();
        expect(elementScope.valid.wrongdate).toBeTruthy();

    });

    it('scope.$watch(ngModel) should set selectedDay with ngModel', function () {
        var elementScope = element.isolateScope();
        elementScope.ngModel = new Date(2004,3,23);
        scope.$digest();
        expect(elementScope.selectedDay.toISOString()).toEqual(new Date(2004,3,23).toISOString());
    });

    it('scope.$watch(ngModel) should set selectedDay with ngModel', function () {
        var elementScope = element.isolateScope();
        elementScope.ngModel = new Date(2004,11,31);
        scope.$digest();
        expect(elementScope.selectedDay.toISOString()).toEqual(new Date(2004,11,31).toISOString());
    });

    it('scope.$watch(visible) should set visible to false when key 27 (ESC) is clicked', inject(function ($window, $timeout) {
        var elementScope = element.isolateScope();
        elementScope.visible = true;
        scope.$digest();

        expect(elementScope.visible).toBeTruthy();

        $timeout.flush();




        angular.element($window).triggerHandler('keydown',[{keyCode:27}]);

//        $timeout.flush();
        expect(elementScope.visible).toBeFalsy();

    }));
});
