angular.module("radio/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("radio/radio.html",
    "<div class=\"bbc-radio\" ng-class=\"{'bbc-checked': isChecked, 'disabled': isDisabled}\" ng-click=\"changeState();\">\n" +
    "    <div class=\"radio-point\"></div>\n" +
    "</div>");
}]);
