var total = 0;

var operations = {}

var CalculatorApp = angular.module('CalculatorApp', []);

CalculatorApp.controller('CalculatorController',['$scope', function ($scope) {

    //Create object to track the input field
    $scope.displayObj = {display: ""};

    //Running total of the calculator
    $scope.total = 0;

    //Track the last operation to process the new number after an operator has been entered
    $scope.lastOp = "";

    //Translate the operator into the appropriate function
    $scope.operators = {
        "+": function (a, b) {
            return a + b
        },
        "-": function (a, b) {
            return a - b
        },
        "*": function (a, b) {
            return a * b
        },
        "/": function (a, b) {
            return a / b
        }
    };

    //If a number is clicked, pass in the number that was clicked and update the display
    //Clear the display if an operator is displayed in the field
    $scope.clickNumber = function(num){
        if ($scope.displayObj.display in $scope.operators){
            $scope.displayObj.display = "";
        }
        $scope.displayObj.display += num.toString();

    };

    //If an operator is clicked, pass in the operator string
    $scope.clickOp = function(op){

        //proceed with updating the display with the selected operator
        var continueCalc = function(op) {
            $scope.displayObj.display = null;
            $scope.displayObj.display = op;
            $scope.lastOp = op;
        };

        //Update the running total, if there are no operators, store the current display as total
        if ($scope.lastOp===""){
            total = parseFloat($scope.displayObj.display);
            //update the display
            continueCalc(op);
        }else {
            //Disallow entering multiple operators back-to-back
            if ($scope.displayObj.display in $scope.operators) {
                alert("Enter a number before entering another operator.");
            }
            //if there is a lastOp, perform the previously requested operation
            else {
                total = $scope.operators[$scope.lastOp](total, parseFloat($scope.displayObj.display));
                continueCalc(op);
            }
        }

    };

    //If = is clicked, process the requested operation held in lastOp on total, and what is in the display
    $scope.equals = function(){
        $scope.displayObj.display = $scope.operators[$scope.lastOp](total,parseFloat($scope.displayObj.display));
        total = 0;
        $scope.lastOp = "";
    };

}]);