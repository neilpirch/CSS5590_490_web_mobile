// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.translateList = new Array();
        $scope.langList = [];
        $scope.selected = null;

        var langHandler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs" +
            "?key=trnsl.1.1.20180922T192857Z.b851acf3ee2f2c80.c0285073e24453786844ddc8f089980f130e736a" +
            "&ui=en");

        langHandler.success(function (data){
            if (data != null && data.dirs != null){
                var langs = data.dirs;

                for (var lang in langs){
                    $scope.langList.push(langs[lang]);
                }
            }
        });
        langHandler.error(function (data){
            alert("There was some error getting the Language List. Please try after some time.");
        });


        $scope.getTranslation = function () {

            let clearVenues = function () {
                $scope.translateList = [];
            };

            clearVenues();
            var textInput = document.getElementById("txt_textInput").value;
            var language = document.getElementById("txt_searchFilter").value;
            if (textInput != null && textInput != "" && language != null && language != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate" +
                    "?key=trnsl.1.1.20180922T192857Z.b851acf3ee2f2c80.c0285073e24453786844ddc8f089980f130e736a" +
                    "&text=" + textInput +
                    "&lang=" + $scope.model.id);

                handler.success(function (data) {
                    if (data != null && data.code != null && data.text != undefined && data.text != null) {
                        // Tie an array named "translateList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        // Marks will be distributed between logic, implementation and UI

                        $scope.translateList.push(data.text[0]);



                    }
                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }

    });
