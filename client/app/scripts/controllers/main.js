'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', [
    '$http',
    '$scope',
    '$window',
  function ($http, $scope, $window) { // note the added $http depedency

    $scope.loading = true; 	// controls the loading spinner in weather detail
    $scope.zipcode = '';    // entered by user
    var slick = $window.localStorage.getItem('slick');
    if (slick) {
      $scope.aLocations = JSON.parse(slick);
    }
    else {
      $scope.aLocations = [
        { zip: 61801, location: 'Urbana, IL', latitude: 40.10243, longitude: -88.19666 },
        { zip: 75230, location: 'Dallas, TX', latitude: 32.90351, longitude: -96.771194 },
        { zip: 20500, location: 'Washington, DC', latitude: 38.898754, longitude: -77.03535 },
        { zip: 98804, location: 'Bellevue, WA', latitude: 47.616505, longitude: -122.20169 },
        { zip: 80301, location: 'Boulder, CO', latitude: 40.059013, longitude: -105.21812 }
      ];
      
      $window.localStorage.setItem('slick', 
                                   JSON.stringify($scope.aLocations));
    }

		$scope.selectedIndex = -1; // shows which of the six location is selected
		$scope.fShowWeatherJSON = false; // show/hide weather JSON data

		/**
			* When the user clicks on 'New', this function
			* gets called.  It is a completely overbuilt
      * route to turn a zipcode into data like in
      * aLocations
      **/
		$scope.addZipcode = function () {

			$http({
				method: 'POST',
				data: {
					zipcode: $scope.zipcode
				},
				url: '/zippopotomus'
			}).then(function successCallback(response) {
				console.log('zippopotomus to the rescue!');
				$scope.aLocations.unshift(response.data);
        $scope.aLocations.pop();
        $window.localStorage.setItem(['slick'], 
                                     JSON.stringify($scope.aLocations));
			}, function errorCallback(response) {
				$window.alert(response.data.message);
			});
		};

		/**
      * Controls the ng-disable on the 'New' button.
      * User must type in five digits to get the
      * button enabled
      **/
		var pattern = new RegExp('^\\d{5}$');
		$scope.isValidZipcode = function () {
      var OK = pattern.test($scope.zipcode);
			return OK;
		};

		/**
      * If the user clicks on one of the aLocations
      * this will go fetch some weather information
      * about that location.
      **/
		$scope.showSelected = function(index) {
			$scope.selectedIndex = index;	
			$scope.fShowWeatherJSON = false;

			$http({
				method: 'POST',
				data: {
					latitude: $scope.aLocations[$scope.selectedIndex].latitude,
					longitude: $scope.aLocations[$scope.selectedIndex].longitude
				},
				url: '/someWeather'
			}).then(function successCallback(response) {
				$scope.maxTemp = response.data['Daily Maximum Temperature'];
				$scope.minTemp = response.data['Daily Minimum Temperature'];
				$scope.summary = response.data['summary'];
				$scope.urlMore = response.data['moreWeatherInformation'];
				$scope.icon = response.data['icon'];
				$scope.loading = false;
			}, function errorCallback(response) {
				$window.alert(response.data.message);
			});
		};

		/**
      * If the user clicks on 'Show JSON' this handles
      * going to get the JSON data and toggling the show/hide
      * mumbo jumbo.
      **/
		$scope.showWeatherJSON = function() {
			if ($scope.fShowWeatherJSON) {
				$scope.fShowWeatherJSON = false;
			}
			else {
				$scope.data = $http({
						method: 'POST',
						data: {
							latitude: $scope.aLocations[$scope.selectedIndex].latitude,
							longitude: $scope.aLocations[$scope.selectedIndex].longitude
						},
						url: '/allWeather'
					}).then(function successCallback(response) {
						$scope.data = response.data;
						$scope.fShowWeatherJSON = true;
					}, function errorCallback(response) {
						$window.alert(response.data.message);
					});
			}
		};

  }]);
