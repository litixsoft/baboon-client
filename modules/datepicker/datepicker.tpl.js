angular.module("datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("datepicker/datepicker.html",
    "<div style=\"display:inline\">\n" +
    "    <div class=\"input-group\" style=\"width:160px;\">\n" +
    "        <input type=\"text\" ng-model=\"selectedDayShort\" id=\"{{inputID}}\" ng-readonly=\"ngReadonly\" name=\"{{inputName}}\" ng-blur=\"getInput()\" class=\"form-control\" placeholder=\"{{placeholder}}\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ng-click=\"visible = !visible\" ng-class=\"{disabled : ngReadonly}\"><span class=\"glyphicon glyphicon-calendar\"></span></button>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div class=\"bbc-datepicker\" ng-show=\"visible\">\n" +
    "        <div class=\"row bbc-datepicker-body\">\n" +
    "            <div class=\"bbc-datepicker-year col-md-2 col-xs-2\" unselectable=\"on\">\n" +
    "                <div class=\"bbc-datepicker-year-btn year-up\">\n" +
    "                    <span class=\"glyphicon glyphicon-circle-arrow-up\" ng-mousedown=\"startScroll('up')\" ng-mouseup=\"stopScroll('up')\"></span>\n" +
    "                </div>\n" +
    "                <div class=\"bbc-datepicker-year-btn year-down\">\n" +
    "                    <span class=\"glyphicon glyphicon-circle-arrow-down\" ng-mousedown=\"startScroll('down')\" ng-mouseup=\"stopScroll('down')\"></span>\n" +
    "                </div>\n" +
    "                <div class=\"bbc-datepicker-year-container\">\n" +
    "                    <ul>\n" +
    "                        <li ng-repeat=\"year in yearNames\" ng-click=\"yearClick(year)\" ng-class=\"{active: selectedDay.getFullYear()===year }\">{{year}}</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"bbc-datepicker-month col-md-3 col-xs-3\">\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"month in monthNames\" ng-click=\"monthClick($index)\" ng-class=\"{active: selectedDay.getMonth()===$index}\">{{month}}</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"bbc-datepicker-day col-md-7 col-xs-7\">\n" +
    "                <table>\n" +
    "                    <thead>\n" +
    "                    <tr>\n" +
    "                        <th ng-repeat=\"name in dayNames\">{{name}}</th>\n" +
    "                    </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                    <tr ng-repeat=\"week in month\">\n" +
    "                        <td>{{week.kw}}</td>\n" +
    "                        <td ng-repeat=\"day in week.days\">\n" +
    "                            <button class=\"btn btn-default btn-sm btn-block\" ng-click=\"dayClick(day)\" ng-class=\"{other: !day.in, 'btn-primary' : (day.in && selectedDay.getDate()===day.nr), today: (today.day===day.nr && today.month===selectedDay.getMonth() && today.year===selectedDay.getFullYear())}\">{{day.nr}}</button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row bbc-datepicker-footer\">\n" +
    "            <div class=\"bbc-datepicker-btn pull-right\">\n" +
    "                <button class=\"btn btn-default btn-sm\" ng-click=\"visible = !visible\">Schließen</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
