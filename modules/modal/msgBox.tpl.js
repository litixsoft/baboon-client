angular.module("modal/msgBox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/msgBox.html",
    "<div class=\"modal-header\">\n" +
    "    <h3>{{ modalOptions.headline }}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <p>{{ modalOptions.message }}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\" ng-if=\"modalOptions.buttonOrder === 'windows'\">\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.ok()\" ng-show=\"!!modalOptions.actionOk\">{{ modalOptions.buttonTextValues.ok || 'Ok' }}</button>\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.yes()\" ng-show=\"!!modalOptions.actionYes\">{{ modalOptions.buttonTextValues.yes || 'Yes' }}</button>\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.no()\" ng-show=\"!!modalOptions.actionNo\">{{ modalOptions.buttonTextValues.no || 'No' }}</button>\n" +
    "    <button class=\"btn btn-default\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.close()\" ng-show=\"!!modalOptions.actionClose\">{{ modalOptions.buttonTextValues.close || 'Close' }}</button>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\" ng-if=\"modalOptions.buttonOrder !== 'windows'\">\n" +
    "    <button class=\"btn btn-default\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.close()\" ng-show=\"!!modalOptions.actionClose\">{{ modalOptions.buttonTextValues.close || 'Close' }}</button>\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.no()\" ng-show=\"!!modalOptions.actionNo\">{{ modalOptions.buttonTextValues.no || 'No' }}</button>\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.yes()\" ng-show=\"!!modalOptions.actionYes\">{{ modalOptions.buttonTextValues.yes || 'Yes' }}</button>\n" +
    "    <button class=\"btn btn-primary\" style=\"min-width: {{ modalOptions.buttonMinWidth }}px;\" ng-click=\"modalOptions.ok()\" ng-show=\"!!modalOptions.actionOk\">{{ modalOptions.buttonTextValues.ok || 'Ok' }}</button>\n" +
    "</div>");
}]);
