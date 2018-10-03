var url = "https://www.googleapis.com/youtube/v3/";
var apiKey = "AIzaSyBhAcbOBlU7lepVO-jyqtq7g1j9lRhT-_c";

angular.module('searchApp', [])

    .controller('searchController', function ($scope, $http) {
        $scope.search = function () {
            console.log("search clicked");
            var q = $('#query').val();
            if (q != null && q !== "") {
                var handler = $http.get(url + "search?" +
                    "part=" + "snippet" +
                    "&q=" + q +
                    "&type=" + "" +
                    "&key=" + apiKey);
                handler.success(function (response) {
                    console.log(response);
                    var str = JSON.stringify(response.result);
                    $('#search-container').html('<pre>' + str + '</pre>');
                });
                handler.error(function (response) {
                    alert("There was some error processing your request.")
                });
            }
        }
    });

