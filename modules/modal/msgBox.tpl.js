angular.module("modal/msgBox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modal/msgBox.html",
    "<div class=\"modal-header\">\n" +
    "    <h4>{{ modalOptions.type }}</h4>\n" +
    "    <p>{{ modalOptions.headline }}</p>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3\">\n" +
    "            <div class=\"icon\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9\">\n" +
    "            <h4>{{ modalOptions.message }}</h4>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"modalOptions.yes()\" ng-show=\"!!modalOptions.actionYes\">Yes</button>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"modalOptions.no()\" ng-show=\"!!modalOptions.actionNo\">No</button>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"modalOptions.close()\" ng-show=\"!!modalOptions.actionClose\">Close</button>\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"modalOptions.ok()\" ng-show=\"!!modalOptions.actionOk\">Ok</button>\n" +
    "</div>\n" +
    "");
}]);
