angular.module('ngAppDemo', ['bbc.inline.edit']).controller('NgAppDemoCtrl', function ($scope, $bbcInlineEdit) {
    $scope.inlineEdit = $bbcInlineEdit();

    $scope.items = [
        { _id : 1, name: 'John Doe', city: 'New York', country: 'USA' },
        { _id : 2, name: 'Tina Tester', city: 'Leipzig', country: 'Germany' },
        { _id : 3, name: 'Sam Sample', city: 'Sydney', country: 'Australia' },
        { _id : 4, name: 'Max Mustermann', city: 'Toronto', country: 'Kanada' }
    ];

    $scope.save = function(item) {
        for(var i = 0; i < $scope.items.length; i++) {
            if(item._id === $scope.items[i]._id) {
                $scope.items[i] = item;
                $scope.inlineEdit.model = null;
                break;
            }
        }
    }
});