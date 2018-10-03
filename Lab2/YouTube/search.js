var url = "https://www.googleapis.com/youtube/v3/";
var apiKey = "AIzaSyBhAcbOBlU7lepVO-jyqtq7g1j9lRhT-_c";

angular.module('searchApp', [])

    .controller('searchController', function ($scope, $http) {

        $scope.query = "";
        $scope.searchResult = "";

        $scope.search = function () {
            console.log("search clicked");
            let q = $scope.query;
            if (q != null && q !== "") {
                let handler = $http.get(url + "search?" +
                    "part=" + "snippet" +
                    "&q=" + $scope.query +
                    "&type=" + "" +
                    "&key=" + apiKey);
                handler.success(function (response) {
                    console.log(response);
                    $scope.searchResult = response.items;
                    //$('#search-container').html('<pre>' + str + '</pre>');
                });
                handler.error(function (response) {
                    alert("There was some error processing your request.")
                });
            }
        }
    });

