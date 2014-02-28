angular.module("alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alert/alert.html",
    "<h2>Ein Alert Template</h2>\n" +
    "        <h3>FLUPPI</h3>");
}]);
