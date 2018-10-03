var url = "https://www.googleapis.com/youtube/v3/";
var apiKey = "AIzaSyBhAcbOBlU7lepVO-jyqtq7g1j9lRhT-_c";
let videoString = "https://www.youtube.com/embed/";

angular.module('searchApp', [])

    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**'
        ]);
    })

    .controller('searchController', function($scope, $http) {

        $scope.query = "";
        $scope.searchResult = "";
        $scope.videoID = "rG_ry1hkFXg";

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
        };

        $scope.setVideo = function(id){
            $scope.videoID = videoString+$scope.videoID;
        }
    });



