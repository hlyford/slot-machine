angular.module('slotmachine.slots', [])

.controller('SlotsController', function ($scope, $http, $location) {  
	// initial state on load
	$scope.slotData = [
		{result: 1, imgSlug: "coffee1"},
		{result: 2, imgSlug: "tea2"},
		{result: 3, imgSlug: "espresso3"},
	]
	$scope.spinning = false, $scope.reward;


	var drinkOptions = ["coffee", "tea", "espresso"];
	
	$scope.leverClick = function() {
		// switch state to spinning
		$scope.spinning = true;
		// start spinner

		// select results
		selectResult();

	}

	function selectResult () {		
		var spinResults = [], randomNumber, imgSlug;
		for (var i = 0; i < 3; i++) {
			// select a number between 1 and 3 (inclusive)
			randomNumber = Math.floor(Math.random() * 3);			
			spinResults[i] = randomNumber;
		}
		// change state to reflect the results		
		$scope.slotData[0].result = spinResults[0], $scope.slotData[0].imgSlug = drinkOptions[spinResults[0]] + "1";
		$scope.slotData[1].result = spinResults[1], $scope.slotData[1].imgSlug = drinkOptions[spinResults[1]] + "2";
		$scope.slotData[2].result = spinResults[2], $scope.slotData[2].imgSlug = drinkOptions[spinResults[2]] + "3";
		// see if user won
		if (spinResults[0] === spinResults[1] && spinResults[0] === spinResults[2])	{
			console.log("Winner!");
			// determine the reward
			if (spinResults[0] === 0) {$scope.reward = "coffee"; }
			else if (spinResults[0] === 1) {$scope.reward = "tea"; }
			else {$scope.reward = "espresso"; }

			$(".bs-example-modal-sm").modal();

		}
	}




})