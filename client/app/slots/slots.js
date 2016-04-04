angular.module('slotmachine.slots', [])

.controller('SlotsController', function ($scope, $http, $location) {  
	// initial state on load
	$scope.slotData = [
		{result: 1, imgSlug: "../images/coffee1.png"},
		{result: 2, imgSlug: "../images/tea2.png"},
		{result: 3, imgSlug: "../images/espresso3.png"},
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
		var spinResults = [], randomNumber;
		
		for (var i = 0; i < 3; i++) {
			// select a number between 1 and 3 (inclusive)
			randomNumber = Math.floor(Math.random() * 3);			
			spinResults[i] = randomNumber;
		}				
		// change state to reflect the results		
		$scope.slotData[0].result = spinResults[0], $scope.slotData[0].imgSlug = "../images/" + drinkOptions[spinResults[0]] + "1.png";
		$scope.slotData[1].result = spinResults[1], $scope.slotData[1].imgSlug = "../images/" + drinkOptions[spinResults[1]] + "2.png";
		$scope.slotData[2].result = spinResults[2], $scope.slotData[2].imgSlug = "../images/" + drinkOptions[spinResults[2]] + "3.png";		
		
		console.log('state', spinCount, ' for 1 ', $scope.slotData[0]);
		// call spin again or go into the callback to check if winner
		if (spinCount < 1) {
			console.log('at ', spinCount, ' : ', $scope.slotData);
			setTimeout(function() {
				return spin(spinCount + 1, callback);			
			}, 200);			
		} else {			
			console.log($scope.slotData[0].imgSlug);
			callback();	
		}
	}
	// starts the spinning then determines if user has won
	function selectResult () {					
		// remove border if user has already played and won
		$('.reel-container').removeClass('orange-border');

		// spin the reels; callback checks if user has won
		spin(0, function() {			
			console.log('done data', $scope.slotData);			
			if ($scope.slotData[0].result === $scope.slotData[1].result && $scope.slotData[0].result === $scope.slotData[2].result)	{				
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