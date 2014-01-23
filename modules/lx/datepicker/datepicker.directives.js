/*global angular*/
angular.module('lx.datepicker.directives',['lx/datepicker/tpls/datepicker.html'])
    .constant('lxDatepickerConfig', {
        minYear: 1880,
        maxYear: 2100
    })
    .directive('lxDatepicker', function ($window,lxDatepickerConfig) {
        return {
            restrict: 'A',
            require: 'ngModel',
            transclude: false,
            replace: true,
            scope: {
                ngModel: '=',
                ngReadonly: '=',
                lxDatepicker: '='
            },
            templateUrl: 'lx/datepicker/tpls/datepicker.html',
            link: function($scope, $element, $attrs, $ctrls) {

                $scope.visible = false; //is datepicker popup visible
                $scope.divider = ''; //the character used to divide the date numbers 12.2.2013
                $scope.placeholder = $scope.lxDatepicker; //placeholder text for the input
                $scope.selectedDay = new Date(); //the selected date, initialized with todays date
                $scope.selectedDayShort = ''; //selected date formated as 12.3.2004
                $scope.inputID = $attrs.id; //id of the input field
                $scope.inputName = $attrs.name; //name of the input field
                $scope.today = {
                    day: $scope.selectedDay.getDate(),
                    month: $scope.selectedDay.getMonth(),
                    year: $scope.selectedDay.getFullYear()
                };
                $scope.yearNames = [];
                $scope.monthNames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
                $scope.dayNames = ['KW','Mo','Di','Mi','Do','Fr','Sa','So'];

                var autoScroll = false; //true if scroll through the years by holding down the keys
                var mainPick = document.getElementById($scope.inputID); //get input with datepicker by id (cause angular $element parent has selectors)
                var scrollCont = mainPick.getElementsByClassName('lx-datepicker-year-container')[0]; //get scroll container
                var dateElement = mainPick.getElementsByClassName('lx-datepicker');
                var datepicker = angular.element(dateElement[0]); //get datepicker

                var off = { //datepicker offset in browser window, used to move datepicker if not fully visible in view
                    top: 40,
                    left: 0
                };

                $element.removeAttr('class');
                $element.removeAttr('type');


                angular.element($window).bind('resize',function(){
                    if($scope.visible){
                        checkPosition();
                    }
                });

                /**
                 * moving datepicker if not fully in view
                 *
                 */
                function checkPosition(){

                    var rect = dateElement[0].getBoundingClientRect();

                    var dimBrowser = {
                        width: $window.innerWidth,
                        height: $window.innerHeight
                    };

                    if( rect.bottom > dimBrowser.height - 20 ){
                        off.top -= ( rect.bottom - (dimBrowser.height - 20));
                        datepicker.css('top',off.top+'px');
                    } else {
                        datepicker.css('top',off.top+'px');
                    }


                    if( rect.right > dimBrowser.width - 20 ){
                        off.left -= ( rect.right - (dimBrowser.width - 20));
                        datepicker.css('left',off.left+'px');
                    } else {
                        datepicker.css('left',off.left+'px');
                    }
                }

                /**
                 * fill Array with a range of numbers start with maxYear ends with minYear
                 *
                 * @returns {array}
                 */
                function fillRange(){
                    var range = [];
                    for(var i = lxDatepickerConfig.maxYear; i >= lxDatepickerConfig.minYear; i--) {
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
                function getDivider(dateFormat){

                    var divider  = '.';

                    var chars = dateFormat.split('');
                    if(chars.indexOf('.')>=0){ divider = '.'; }
                    if(chars.indexOf('/')>=0){ divider = '/'; }
                    if(chars.indexOf('-')>=0){ divider = '-'; }

                    return divider;
                }

                /**
                 * Validates date
                 *
                 * @param {string} format 22.22.2003
                 * @returns {boolean}
                 */
                function validateDate(selectedDayShort){

                    var parts = selectedDayShort.split(getDivider(selectedDayShort));
                    if(parts.length === 3){

                        var m = parseInt(parts[1], 10);
                        var d = parseInt(parts[0], 10);
                        var y = parseInt(parts[2], 10);
                        var date = new Date(y,m-1,d);

                        if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }

                /**
                 * Gets the start values for the days array
                 *
                 * @param {object} date
                 * @returns {object} with all values to start creating the days of the selected month
                 */
                function getCalendarValues(selectedDay){

                    var currentYear = selectedDay.getFullYear();
                    var currentMonth = selectedDay.getMonth();
                    var firstDayOfMonth = new Date(currentYear,currentMonth,1);
                    var lastDayOfYear = new Date(currentYear,11,31);

                    var firstWednesday = new Date(new Date(currentYear,0,4).getTime() + (3-((new Date(currentYear,0,4).getDay()+6) % 7)) * 86400000); //erster Donnerstag im Jahr, international festgelegt
                    var calendarWeek = Math.floor(1.5 + (firstDayOfMonth.getTime() - firstWednesday.getTime()) / 86400000/7);
                    var lastCalendarWeek = Math.floor(1.5 + (lastDayOfYear.getTime() - firstWednesday.getTime()) / 86400000/7);

                    var nextMonth = selectedDay.getMonth()+1;
                    if(nextMonth>11){nextMonth=0;currentYear++;}
                    var firstDayNextMonth = new Date(currentYear,nextMonth,1);
                    var daysOfCurrentMonth = new Date(firstDayNextMonth-1);

                    var lastMonthDays = new Date(firstDayOfMonth-1);

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
                function createDays(selectedDay){

                    var startpoint = getCalendarValues(selectedDay);
                    var startDaySecondWeek = 0;
                    $scope.month = [];
                    var inOut = true;

                    for(var i = 0; i < 6; i++){
                        var days = [];
                        if(i===0){
                            var countFirstLine = 0;
                            var value = 2;
                            if(startpoint.firstDay<2){
                                value = -5;
                            }
                            for(var j = (startpoint.daysLastMonth - (startpoint.firstDay-value)); j <= (startpoint.daysLastMonth); j++){

                                days.push({nr: j, in: false});
                                countFirstLine++;
                            }
                            for(var k = 1; countFirstLine < 7; k++){
                                countFirstLine++;
                                days.push({nr: k, in: true});
                                startDaySecondWeek = k;
                            }
                        }
                        else {
                            for(var l = 1; l < 8; l++){
                                startDaySecondWeek++;
                                if(startDaySecondWeek>startpoint.daysCurrentMonth){
                                    startDaySecondWeek=1;
                                    inOut=false;
                                }
                                days.push({nr: startDaySecondWeek, in: inOut});
                            }
                        }
                        var temp = {
                            kw: (startpoint.currentKW+i),
                            days: days
                        };
                        $scope.month.push(temp);
                    }
                    return $scope.month;
                }

                /**
                 * Checks if the inputfield is required
                 */
                function checkIfIsRequired(){

                    setTimeout(function(){
                        if($ctrls.$error.required){
                            $scope.isRequired = true;
                        } else {
                            $scope.isRequired = false;
                        }
                    },10);
                }

                /**
                 * Fills the day and month with 0 for format xx.xx.xxxx
                 */
                function updateInput(){ //fills the input field and fills date up with 0zeros if day or month are smaller than 10 example: 7 -> 07

                    var day = $scope.selectedDay.getDate();
                    if(day<10){ day = '0'+day; }

                    var month = $scope.selectedDay.getMonth()+1;
                    if(month<10){ month = '0'+month; }
                    $scope.selectedDayShort = (day+''+$scope.divider+''+month+''+$scope.divider+''+$scope.selectedDay.getFullYear());
                }

                /**
                 * scrolls the year container in the assigned direction, recursive
                 *
                 * @param {string} up or down
                 */
                function autoScrollFunc(direction){
                    if(autoScroll){
                        setTimeout(function(){
                            if(direction==='up'){
                                scrollCont.scrollTop -= 5;
                            } else if(direction==='down'){
                                scrollCont.scrollTop += 5;
                            }

                            autoScrollFunc(direction);
                        },20);
                    }
                }

                /**
                 * is called when a year is clicked, set the selected date and refresh view
                 *
                 * @param {string} format 2013
                 */
                $scope.yearClick = function(number){
                    $scope.selectedDay.setFullYear(number);
                    update(); //if year changed update days in the datepicker
                };

                /**
                 * is called when a month is clicked, set the selected date and refresh view
                 *
                 * @param {string} format 0 - 11
                 */
                $scope.monthClick = function(number){
                    $scope.selectedDay.setMonth(number);
                    update(); //if month changed update days in the datepicker
                };

                /**
                 * is called when a day is clicked, set the selected date and refresh model, hide datepicker
                 *
                 * @param {string} format 1 - 31
                 */
                $scope.dayClick = function(number){

                    if(!number.in){ //if clicked number is in last or next month
                        var month;
                        if(number.nr>20){ //next month
                            month = $scope.selectedDay.getMonth()-1;
                        }
                        if(number.nr<10){ //last month
                            month = $scope.selectedDay.getMonth()+1;
                        }
                        $scope.selectedDay.setMonth(month); //set the correct month
                    }
                    $scope.selectedDay.setDate(number.nr); //set the day
                    $scope.selectedDay.setHours(5); // set hours of time to 5 o clock
                    $scope.ngModel = new Date(''+$scope.selectedDay); //set the model with the new selected date
                    $scope.visible = false; // hide the datepicker
                    $ctrls.$dirty = false; //validation: input not dirty
                    $ctrls.$setValidity('date', true); //set validation of a wrong date to false
//                    updateInput(); //update the input
                };

                /**
                 * is called on blur of the input to validate the date
                 *
                 */
                $scope.getInput = function(){ //is called on blur

                    var valid = {
                        required: true,
                        date: true
                    };

                    $ctrls.$dirty = true;

                    if(validateDate($scope.selectedDayShort)){ //check if date in input is valid

                        var parts = $scope.selectedDayShort.split(getDivider($scope.selectedDayShort));
                        $scope.selectedDay.setDate(parts[0]);
                        if(parts[1] >= 0 && parts[1] <= 12){
                            $scope.selectedDay.setMonth(parts[1]-1);
                        }
                        $scope.selectedDay.setFullYear(parts[2]);

                        $scope.ngModel = new Date(''+$scope.selectedDay); //set the model with the new date from the input

                        valid.date = true; //date is valid no need to show error
                        valid.required = true; //required is valid no need to show error

//                        updateInput(); //fill the input with zeros if necessary

                    } else {

                        if($scope.selectedDayShort.length < 1){
                            if($scope.isRequired){
                                valid.required = false;
                                valid.date = true;
                            } else {
                                valid.required = true;
                                valid.date = false;
                            }
                        } else {
                            valid.required = true;
                            valid.date = false;
                        }

                    }

                    $ctrls.$setValidity('date', valid.date); //true or false
                    $ctrls.$setValidity('required', valid.required); //true or false

                };

                /**
                 * is called onmousedown on one of the scroll buttons, starts scrolling
                 *
                 * @param {string} up or down direction
                 */
                $scope.startScroll = function(direction){
                    autoScroll = true;
                    autoScrollFunc(direction);
                };

                /**
                 * is called onmouseup on one of the scroll buttons, stops scrolling
                 */
                $scope.stopScroll = function(){
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
                $scope.$watch('visible',function(newValue){

                    if(newValue){ //if visible

                        off = {
                            top: 40,
                            left: 0
                        };
                        checkPosition();

//                        if($scope.selectedDayShort!=='' ){ //fill selectedDay with ngmodel if open datepicker
//                            if($scope.ngModel){ // if the model has a date
//                                $scope.selectedDay = angular.copy(new Date($scope.ngModel));
//                            } else { //if no value then use today's date
//                                $scope.selectedDay = new Date();
//                            }
//                        }

                        var offsetTop = ( $scope.yearNames.indexOf($scope.selectedDay.getFullYear()) - 2 ) * 24; //selected year offset in the year container

                        setTimeout(function(){
                            scrollCont.scrollTop = offsetTop; // auto scroll to selected year
                            angular.element($window).bind('keydown',function(ev){
                                if(ev.keyCode===27){ //ESC
                                    $scope.$apply(function(){
                                        $scope.visible = false;
                                    });
                                }
                            });

                        },10);
                    }
                });



                /* -------- start ------------- */
                checkIfIsRequired();

                $scope.divider = getDivider($scope.lxDatepicker);
                $scope.yearNames = fillRange();

                $scope.$watch('ngModel',function(){

                    var test = new Date($scope.ngModel);

                    if(test.toString() !== 'Invalid Date'){
                        $scope.selectedDay = test;
                        $scope.selectedDayShort = test.getDate()+''+$scope.divider+''+(test.getMonth()+1)+''+$scope.divider+''+test.getFullYear();
                        updateInput(); //fill the input with zeros if necessary
                    } else {
                        $scope.selectedDay = new Date();
                    }
                    createDays($scope.selectedDay);
                });






                function update(){
                    createDays($scope.selectedDay);
                }

            }
        };
    });

