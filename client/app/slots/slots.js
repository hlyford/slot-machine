angular.module('slotmachine.slots', [])

.controller('SlotsController', function ($scope) {  
	// initial state on load
	$scope.slotData = [
		{result: 1, imgSlug: "../images/coffee1.png"},
		{result: 2, imgSlug: "../images/tea2.png"},
		{result: 3, imgSlug: "../images/espresso3.png"},
	]
	$scope.reward;
	var drinkOptions = ["coffee", "tea", "espresso"];
	
	// event triggered by user
	$scope.leverClick = function() {				
		// start spinning the reels
		startSpin();		
		// determine the results
		selectResult();		
	}

	// randomly selects a result for each reel
	function selectResult (callback) {		
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
	}	
	

	function startSpin () {
		// remove border if user has already played and won
		$('.reel-container').removeClass('orange-border');
		// start each reel spinning
		$('.slot-one').addClass('spinning1');
		$('.slot-two').addClass('spinning2');
		$('.slot-three').addClass('spinning3');		
		// stop reels
		stopSpin();
	}

	function stopSpin () {
		// stop reel 1
		setTimeout(function() {
			$('.slots').removeClass('spinning1');
			$('.slot-one').css('background-image', "url(" + $scope.slotData[0].imgSlug + ")");
		}, 1200)
		// stop reel 2
		setTimeout(function() {
			$('.slots').removeClass('spinning2');
			$('.slot-two').css('background-image', "url(" + $scope.slotData[1].imgSlug + ")");
		}, 1800)
		// stop reel 3
		setTimeout(function() {
			$('.slots').removeClass('spinning3');
			$('.slot-three').css('background-image', "url(" + $scope.slotData[2].imgSlug + ")");
			checkResult();
		}, 2100)
	}

	function checkResult() {		
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
	}




})