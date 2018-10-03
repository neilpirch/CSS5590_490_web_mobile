var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('angularTodoC', ['$scope', function ($scope) {
    // define list of items
    $scope.items = ["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"];

    //Create list to store Item objects
    $scope.itemList = [];

    //Fill the initial list
    $scope.items.forEach(function (item) {
        $scope.itemList.push(new Item(item));
    });

    //Add a new item to the list and reset the input field
    $scope.submitNewItem = function (input) {
        $scope.itemList.push(new Item(input));
        $scope.item.item=null;
    };

    //Mark an item as completed so the class can change
    $scope.completeItem = function (index) {
        $scope.itemList[index].completed = true;
    };

    //Remove the selected item from the list
    $scope.deleteItem = function (index) {
        $scope.itemList.splice(index,1);
    };
}]);

//Create Item objects to track their name and their completion state
function Item(item) {
    this.item = item;
    this.completed = false;
}