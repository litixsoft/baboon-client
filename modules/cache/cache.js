'use strict';

angular.module('bbc.cache', [])
    /**
     * @ngdoc object
     * @name bbc.cache.$bbcCache
     *
     * @description
     * Simple client cache.
     *
     * @example
     <example module="ngView">
        <file name="index.html">
            <div ng-controller="CacheCtrl">
                <div class="form-group">
                    <input type="text" ng-model="user.firstname" class="form-control" placeholder="first name" />
                </div>
                <div class="form-group">
                    <input type="text" ng-model="user.lastname" class="form-control" placeholder="last name" />
                </div>
                <div class="form-group">
                    <button class="btn btn-default" ng-click="addToCache(user)">Add to cache</button>
                    <button class="btn btn-default" ng-click="clearCache()">Clear cache</button>
                </div>
                <pre>{{ bbcCache | json }}</pre>
            </div>
        </file>
        <file name="scripts.js">
            angular.module('ngView', ['bbc.cache']).controller('CacheCtrl', function ($scope, $bbcCache) {
                $scope.bbcCache = $bbcCache;
                $scope.addToCache = function(user) {
                    $bbcCache['_user'] = user;
                };

                $scope.clearCache = function() {
                    delete $bbcCache['_user'];
                };
            });
        </file>
     </example>
     */
    .factory('$bbcCache', function () {
        return {};
    });
