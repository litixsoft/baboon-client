'use strict';

angular.module('bbc.datepicker', ['datepicker/datepicker.html'])
    .constant('bbcDatepickerConfig', {
        minYear: 1880,
        maxYear: 2100
    })
    /**
     * @ngdoc directive
     * @name bbc.datepicker.directive:bbcDatepicker
     * @restrict A
     * @element input
     *
     * @description
     * Creates a datepicker.
     *
     *
     * @example
     <example module="ngView">
     <file name="index.html">
         <div ng-controller="DatepickerCtrl">
             <input name="pick" ng-model="date" bbc-datepicker placeholder="dd.MM.yyyy">
         </div>
     </file>
     <file name="scripts.js">
        angular.module('ngView', ['bbc.datepicker']).controller('DatepickerCtrl', function ($scope) {
        });
     </file>
     </example>
     */
    .directive('bbcDatepicker', function ($window,$filter, bbcDatepickerConfig) {
        return {
            restrict: 'A',
            require: 'ngModel',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                ngReadonly: '=',
                bbcDatepicker: '='
            },
            templateUrl: 'datepicker/datepicker.html',
            link: function (scope, element, attrs, ctrls) {
                scope.visible = false;                     // is datepicker popup visible
                scope.divider = '';                        // the character used to divide the date numbers 12.2.2013
                scope.placeholder = attrs.placeholder;     // placeholder text for the input
                scope.dateFormat = scope.bbcDatepicker || 'dd.MM.yyyy';
                scope.selectedDay = new Date();            // the selected date, initialized with todays date
                scope.selectedDayShort = '';               // selected date formated as 12.3.2004
                scope.today = {
                    day: scope.selectedDay.getDate(),
                    month: scope.selectedDay.getMonth(),
                    year: scope.selectedDay.getFullYear()
                };
                scope.yearNames = [];
                scope.monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
                scope.dayNames = ['KW', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
//                scope.dayNames = ['KW', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

                var autoScroll = false; // true if scroll through the years by holding down the keys
                var mainPick = element[0]; //document.getElementById(scope.inputID); //get input with datepicker by id (cause angular element parent has selectors)
                var scrollCont = mainPick.getElementsByClassName('bbc-datepicker-year-container')[0];
                var dateElement = mainPick.getElementsByClassName('bbc-datepicker');
                var datepicker = angular.element(dateElement[0]);

                var off = { // datepicker offset in browser window, used to move datepicker if not fully visible in view
                    top: 5,
                    left: 0
                };

                angular.element($window).bind('resize', function () {
                    if (scope.visible) {
                        checkPosition();
                    }
                });

                /**
                 * moving datepicker if not fully in view
                 *
                 */
                function checkPosition () {
                    var rect = element[0].getBoundingClientRect();
                    var popup = dateElement[0].getBoundingClientRect();
                    var width = $window.innerWidth;
                    var height = $window.innerHeight;

                    if ((rect.bottom + popup.height) > height - 20) {
                        off.top -= ( (rect.bottom + popup.height) - (height - 20));
                    }

                    datepicker.css('top', off.top + 'px');

                    if ((rect.left + popup.width) > width - 20) {
                        off.left -= ( (rect.left + popup.width) - (width - 20));
                    }

                    datepicker.css('left', off.left + 'px');
                }

                /**
                 * fill Array with a range of numbers start with maxYear ends with minYear
                 *
                 * @returns {array}
                 */
                function fillRange () {
                    var range = [];
                    for (var i = bbcDatepickerConfig.maxYear; i >= bbcDatepickerConfig.minYear; i--) {
                        range.push(i);
                    }
                    return range;
                }

                /**
                 * Gets the used divider
                 *
                 * @param {string} format 22.22.2003
                 * @returns {string} ./-
                 */
                function getDivider (dateFormat) {

//                    var regex =  /y/; // /id=[\'\"]{0,1}(\w+)/; //gets the id attribute
//                    var matches = dateFormat.match(regex);

                    var divider = '.';
                    var chars = dateFormat.split('');
                    if (chars.indexOf('.') >= 0) { divider = '.'; }
                    if (chars.indexOf('/') >= 0) { divider = '/'; }
                    if (chars.indexOf('-') >= 0) { divider = '-'; }
                    if (chars.indexOf(':') >= 0) { divider = ':'; }

                    return divider;
                }

                /**
                 * Validates date
                 *
                 * @param {string} format 22.22.2003
                 * @returns {boolean}
                 */
                function validateDate (selectedDayShort) {

                    var partsDivider = getDivider(selectedDayShort);
                    var parts = selectedDayShort.split(partsDivider);

                    var partsFormatDivider = getDivider(scope.dateFormat);
                    var partsFormat = scope.dateFormat.split(partsFormatDivider);

                    var returnValue = {
                        error: null,
                        result: null
                    };

                    if (parts.length === 3 && partsFormat.length === 3) {//
                        var part1 = parseInt(parts[0], 10);
                        var part2 = parseInt(parts[1], 10);
                        var part3 = parseInt(parts[2], 10);
                        var dateFixed = '';

                        if(partsFormat[0].indexOf('d')!==-1 && partsFormat[1].indexOf('M')!==-1 && partsFormat[2].indexOf('y')!==-1){
                            var tempDate = new Date(part3,part2-1,part1,8,0,0);
                            console.log("-----"+tempDate);
                            if(tempDate.getMonth()=== (part2-1) && tempDate.getDate()=== part1){
//                                return true;
                                returnValue.result = tempDate;
                                return returnValue;
                            } else {
                                returnValue.error = 'day';
                                return returnValue;
                            }
                        }
                        if(partsFormat[2].indexOf('d')!==-1 && partsFormat[1].indexOf('M')!==-1 && partsFormat[0].indexOf('y')!==-1){
                            var tempDate = new Date(part1,part2-1,part3,8,0,0);
                            if(tempDate.getMonth()=== (part2-1) && tempDate.getDate()=== part3){
//                                return true;
                                returnValue.result = tempDate;
                                return returnValue;
                            } else {
                                returnValue.error = 'day';
                                return returnValue;
                            }
                        }
                        if(partsFormat[1].indexOf('d')!==-1 && partsFormat[0].indexOf('M')!==-1 && partsFormat[2].indexOf('y')!==-1){
                            var tempDate = new Date(part3,part1-1,part2,8,0,0);
                            if(tempDate.getMonth()=== (part1-1) && tempDate.getDate()=== part2){
//                                return true;
                                returnValue.result = tempDate;
                                return returnValue;
                            } else {
                                returnValue.error = 'day';
                                return returnValue;
                            }
                        }

                    }
                    returnValue.error = 'format';
                    return returnValue;

                }

                /**
                 * Gets the start values for the days array
                 *
                 * @param {object} date
                 * @returns {object} with all values to start creating the days of the selected month
                 */
                function getCalendarValues (selectedDay) {
                    var currentYear = selectedDay.getFullYear();
                    var currentMonth = selectedDay.getMonth();
                    var firstDayOfMonth = new Date(currentYear, currentMonth, 1);
                    var lastDayOfYear = new Date(currentYear, 11, 31);
                    var firstWednesday = new Date(new Date(currentYear, 0, 4).getTime() + (3 - ((new Date(currentYear, 0, 4).getDay() + 6) % 7)) * 86400000); //erster Donnerstag im Jahr, international festgelegt
                    var calendarWeek = Math.floor(1.5 + (firstDayOfMonth.getTime() - firstWednesday.getTime()) / 86400000 / 7);
                    var lastCalendarWeek = Math.floor(1.5 + (lastDayOfYear.getTime() - firstWednesday.getTime()) / 86400000 / 7);
                    var nextMonth = selectedDay.getMonth() + 1;

                    if (nextMonth > 11) {
                        nextMonth = 0;
                        currentYear++;
                    }

                    var firstDayNextMonth = new Date(currentYear, nextMonth, 1);
                    var daysOfCurrentMonth = new Date(firstDayNextMonth - 1);
                    var lastMonthDays = new Date(firstDayOfMonth - 1);

                    var startPoint = {
                        currentKW: calendarWeek,
                        lastKW: lastCalendarWeek,
                        firstDay: firstDayOfMonth.getDay(),
                        daysLastMonth: lastMonthDays.getDate(),
                        daysCurrentMonth: daysOfCurrentMonth.getDate()
                    };
                    return startPoint;
                }

                /**
                 * Returns the days of the current month
                 *
                 * @param {object} selected date
                 * @returns {object} with the days of this, the last and the next month to fill a 7x6 matrix
                 */
                function createDays (selectedDay) {
                    var startpoint = getCalendarValues(selectedDay);
                    var startDaySecondWeek = 0;
                    scope.month = [];
                    var inOut = true;

                    for (var i = 0; i < 6; i++) {
                        var days = [];
                        if (i === 0) {
                            var countFirstLine = 0;
                            var value = 2;
//                            var value = 1;
                            if (startpoint.firstDay < 2) {
                                value = -5;
                            }
                            for (var j = (startpoint.daysLastMonth - (startpoint.firstDay - value)); j <= (startpoint.daysLastMonth); j++) {
                                days.push({nr: j, in: false});
                                countFirstLine++;
                            }
                            if(countFirstLine===7){
                                startpoint.currentKW--;
                            }
                            for (var k = 1; countFirstLine < 7; k++) {
                                countFirstLine++;
                                days.push({nr: k, in: true});
                                startDaySecondWeek = k;
                            }
                        }
                        else {
                            for (var l = 1; l < 8; l++) {
                                startDaySecondWeek++;
                                if (startDaySecondWeek > startpoint.daysCurrentMonth) {
                                    startDaySecondWeek = 1;
                                    inOut = false;
                                }
                                days.push({nr: startDaySecondWeek, in: inOut});
                            }
                        }
                        var tempkw = startpoint.currentKW;
                        if(startpoint.currentKW===0 && i===0){
                            tempkw=53;
                        }
                        if(startpoint.currentKW>= 48 && i===5){
                            tempkw=-4;
                        }

                        var temp = {
                            kw: (tempkw + i),
                            days: days
                        };
                        scope.month.push(temp);
                    }
                    return scope.month;
                }

                /**
                 * scrolls the year container in the assigned direction, recursive
                 *
                 * @param {string} up or down
                 */
                function autoScrollFunc (direction) {
                    if (autoScroll) {
                        setTimeout(function () {
                            if (direction === 'up') {
                                scrollCont.scrollTop -= 5;
                            } else if (direction === 'down') {
                                scrollCont.scrollTop += 5;
                            }

                            autoScrollFunc(direction);
                        }, 20);
                    }
                }

                /**
                 * is called when a year is clicked, set the selected date and refresh view
                 *
                 * @param {string} format 2013
                 */
                scope.yearClick = function (number) {
                    scope.selectedDay.setFullYear(number);
                    update(); // if year changed update days in the datepicker
                };

                /**
                 * is called when a month is clicked, set the selected date and refresh view
                 *
                 * @param {string} format 0 - 11
                 */
                scope.monthClick = function (number) {
                    scope.selectedDay.setMonth(number);
                    update(); // if month changed update days in the datepicker
                };

                /**
                 * is called when a day is clicked, set the selected date and refresh model, hide datepicker
                 *
                 * @param {string} format 1 - 31
                 */
                scope.dayClick = function (number) {
                    if (!number.in) { // if clicked number is in last or next month
                        var month;

                        scope.selectedDay.setDate(2);

                        if (number.nr > 20) { //next month
                            month = scope.selectedDay.getMonth() - 1;
                        }
                        if (number.nr < 10) { //last month
                            month = scope.selectedDay.getMonth() + 1;
                        }
                        scope.selectedDay.setMonth(month); // set the correct month
                    }

                    scope.selectedDay.setDate(number.nr);              // set the day
                    scope.selectedDay.setHours(5);                     // set hours of time to 5 o clock
                    scope.ngModel = new Date('' + scope.selectedDay);  // set the model with the new selected date
                    scope.visible = false;                             // hide the datepicker
                    ctrls.$dirty = false;                              // validation: input not dirty
                    ctrls.$setValidity('date', true);                  // set validation of a wrong date to false
                };

                /**
                 * is called on blur of the input to validate the date
                 *
                 */
                scope.getInput = function () {

                    var valid = {
                        required: attrs.required ? false : true,
                        date: true,
                        wrongdate: true
                    };

                    ctrls.$dirty = true;

                    if (scope.selectedDayShort.length < 1) {
                        if (attrs.required) {
                            valid.required = false;
                            valid.date = true;
                        } else {
                            valid.required = true;
                            valid.date = true;
                        }
                    } else {
                        var validationObject = validateDate(scope.selectedDayShort);
                        if (!validationObject.error) {
//                            var parts = scope.selectedDayShort.split(getDivider(scope.selectedDayShort));
//                            scope.selectedDay.setDate(parts[0]);
//                            if (parts[1] >= 0 && parts[1] <= 12) {
//                                scope.selectedDay.setMonth(parts[1] - 1);
//                            }
//                            scope.selectedDay.setFullYear(parts[2]);
                            console.log("result: "+validationObject.result);
                            console.log("filter:"+$filter('date')(validationObject.result, scope.dateFormat));
                            scope.ngModel = validationObject.result;// new Date('' + scope.selectedDay); // set the model with the new date from the input

                            valid.date = true;      // date is valid no need to show error
                            valid.required = true;  // required is valid no need to show error
                            valid.wrongdate = true;
                        } else {
                            valid.required = true;
                            if(validationObject.error==='day'){
                                valid.wrongdate = false;
                            } else {
                                valid.date = false;
                            }

                        }
                    }

                    ctrls.$setValidity('date', valid.date); //true or false
                    ctrls.$setValidity('required', valid.required); //true or false
                    ctrls.$setValidity('wrongdate', valid.wrongdate); //true or false

                };

                /**
                 * is called onmousedown on one of the scroll buttons, starts scrolling
                 *
                 * @param {string} up or down direction
                 */
                scope.startScroll = function (direction) {
                    autoScroll = true;
                    autoScrollFunc(direction);
                };

                /**
                 * is called onmouseup on one of the scroll buttons, stops scrolling
                 */
                scope.stopScroll = function () {
                    autoScroll = false;
                };

                /**
                 * watches if the the datepicker popup is visible, if so:
                 * - get an old date value from the model or set the date with today's values
                 * - calculate selected year's offset in the year container and then scroll to its position
                 * - $window bind keydown for ESC key to close the datepicker
                 *
                 * @param {object} selected date
                 * @returns {object} with the days of this, the last and the next month to fill a 7x6 matrix
                 */
                scope.$watch('visible', function (newValue) {
                    if (newValue) { //if visible
                        off = {
                            top: 5,
                            left: 0
                        };

                        checkPosition();

                        var offsetTop = ( scope.yearNames.indexOf(scope.selectedDay.getFullYear()) - 2 ) * 24; //selected year offset in the year container

                        setTimeout(function () {
                            scrollCont.scrollTop = offsetTop; // auto scroll to selected year
                            angular.element($window).bind('keydown', function (ev) {
                                if (ev.keyCode === 27) { // ESC
                                    scope.$apply(function () {
                                        scope.visible = false;
                                    });
                                }
                            });
                        }, 30);
                    }
                });

                /* -------- start ------------- */
//                scope.divider = getDivider(scope.bbcDatepicker);
                scope.yearNames = fillRange();

                scope.$watch('ngModel', function () {
                    var test = new Date(scope.ngModel);

                    if (test.toString() !== 'Invalid Date') {
                        scope.selectedDay = test;
                        scope.selectedDayShort = $filter('date')(test,scope.dateFormat);
                    } else {
                        scope.selectedDay = new Date();
                    }
                    createDays(scope.selectedDay);
                });


                function update () {
                    createDays(scope.selectedDay);
                }
            }
        };
    });