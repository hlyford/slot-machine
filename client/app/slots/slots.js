angular.module('slotmachine.slots', [])

.controller('SlotsController', function ($scope, $http, $location) {  
	$scope.slotData = {
		slot1: 1,
		slot2: 1, 
		slot3: 1
	}
	
	$scope.leverClick = function() {
		// start spinner
		// select results
		selectResult();

	}

	function selectResult () {
		var spinResults = [], randomNumber;
		for (var i = 1; i < 4; i++) {
			// select a number between 1 and 3 (inclusive)
			randomNumber = Math.floor(Math.random() * 3) + 1 ;
			spinResults[i] = randomNumber; 
		}
		// change state to reflect the results		
		$scope.slotData.slot1 = spinResults[1], $scope.slotData.slot2 = spinResults[2], $scope.slotData.slot3 = spinResults[3];


	}




})