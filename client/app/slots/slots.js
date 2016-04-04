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
		// spin and select results
		selectResult();

	}

	// conducts an individual random selection of the reels
	function spin (spinCount, callback) {		
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
		
		// call spin again or go into the callback to check if winner
		if (spinCount < 5) {
			console.log('at ', spinCount, ' : ', $scope.slotData);
			setTimeout(function() {
				return spin(spinCount + 1, callback);			
			}, 100);			
		} else {			
			callback();	
		}
	}
	// starts the spinning then determines if user has won
	function selectResult () {					
		// remove border if user has just won
		$('.reel-container').removeClass('orange-border');

		// callback checks if user has won
		spin(0, function() {			
			console.log($scope.slotData);
			if (true) {
			// if ($scope.slotData[0].result === $scope.slotData[1].result && $scope.slotData[0].result === $scope.slotData[2].result)	{
				console.log("Winner!");
				// determine the reward
				if ($scope.slotData[0].result === 0) {$scope.reward = "coffee"; }
				else if ($scope.slotData[0].result === 1) {$scope.reward = "tea"; }
				else {$scope.reward = "espresso"; }
				// flash the border
				var flashInterval = setInterval(function() {
    			$('.reel-container').toggleClass('orange-border');
				}, 100);		
				// stop the border flash but keep border, show prize		
				setTimeout(function() {					
					window.clearInterval(flashInterval);
					$('.reel-container').addClass('orange-border');
					$(".bs-example-modal-sm").modal();
				}, 1000);
			}
		});		
	}




})