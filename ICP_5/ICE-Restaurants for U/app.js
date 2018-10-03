// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;

        $scope.getVenues = function () {

            let clearVenues = function () {
                $scope.translateList = [];
            };

            clearVenues();
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=DD0AUXII34CV5C33X25SXALT0XOPTQHZTZP5XN1MJX3ZQ2MZ" +
                    "&client_secret=IM5JT1VVXXV1JE0ZVZN4JCFUWWUISIQNUBNZILF0DVM2GZCU" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        // Tie an array named "translateList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        // Marks will be distributed between logic, implementation and UI

                        let response = data.response;
                        let places = response.venues;

                        for (var place in places){
                            let spot = places[place];
                            $scope.venueList.push(spot);
                        }

                    }
                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }

    });
