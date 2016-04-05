angular.module('slotmachine.slots', [])
.controller('SlotsController', function ($scope) {  
	// initial state on load
	$scope.slotData = [
		{result: 1, imgSlug: ''},
		{result: 2, imgSlug: ''},
		{result: 3, imgSlug: ''},
	]
	$scope.reward, $scope.gameStatus = false;
	// drink strings that are used to create image urls
	var drinkOptions = ['coffee', 'tea', 'espresso'];
	
	// event triggered by user
	$scope.leverClick = function () {				
		// start spinning the reels
		startSpin();		
		// determine the results
		selectResult();		
	}

	// determines the correct button ("spin" vs "play again") to show in UI
	$scope.gameOver = function () {				
		return $scope.gameStatus;
	}

	// resets game so user can spin again
	$scope.resetGame = function () {
		$scope.$evalAsync (function () {
			$scope.gameStatus = false;				
		})
		// reset background images for reels
		$('.slot-one').css('background-image', 'url(../images/slot1_all2.png');
		$('.slot-two').css('background-image', 'url(../images/slot2_all2.png)');
		$('.slot-three').css('background-image', 'url(../images/slot3_all2.png)');
		// remove border if user has already played and won
		$('.reel-container').removeClass('orange-border');
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
		$scope.slotData[0].result = spinResults[0], $scope.slotData[0].imgSlug = '../images/' + drinkOptions[spinResults[0]] + '1.png';
		$scope.slotData[1].result = spinResults[1], $scope.slotData[1].imgSlug = '../images/' + drinkOptions[spinResults[1]] + '2.png';
		$scope.slotData[2].result = spinResults[2], $scope.slotData[2].imgSlug = '../images/' + drinkOptions[spinResults[2]] + '3.png';																		
	}	

	// starts spinning then calls off to stopSpin function
	function startSpin () {		
		// start each reel spinning
		$('.slot-one').addClass('spinning1');
		$('.slot-two').addClass('spinning2');
		$('.slot-three').addClass('spinning3');		
		// stop reels
		stopSpin();
	}

	// stops spinning at different time intervals
	function stopSpin () {
		// stop reel 1
		setTimeout(function() {
			$('.slots').removeClass('spinning1');
			$('.slot-one').css('background-image', 'url(' + $scope.slotData[0].imgSlug + ')');
		}, 1200)
		// stop reel 2
		setTimeout(function() {
			$('.slots').removeClass('spinning2');
			$('.slot-two').css('background-image', 'url(' + $scope.slotData[1].imgSlug + ')');
		}, 1800)
		// stop reel 3
		setTimeout(function() {
			$('.slots').removeClass('spinning3');
			$('.slot-three').css('background-image', 'url(' + $scope.slotData[2].imgSlug + ')');
			checkForWinner();
		}, 2100)
	}

	// checks if the user has won
	function checkForWinner () {		
		if ($scope.slotData[0].result === $scope.slotData[1].result && $scope.slotData[0].result === $scope.slotData[2].result)	{				
			// determine the reward
			if ($scope.slotData[0].result === 0) {$scope.reward = 'coffee'; }
			else if ($scope.slotData[0].result === 1) {$scope.reward = 'tea'; }
			else {$scope.reward = 'espresso'; }
			// flash the border
			var flashInterval = setInterval(function() {
  			$('.reel-container').toggleClass('orange-border');
			}, 100);					
			setTimeout(function() {
				// stop the border flash but keep border, show prize		
				window.clearInterval(flashInterval);
				winningEffects(); 
			}, 1000);			
		}
		$scope.$apply(function () {
			$scope.gameStatus = true;				
		})
	}
	// toggles win UI effects
	function winningEffects () {					
		$('.reel-container').addClass('orange-border');
		$('.bs-example-modal-sm').modal();		
	}
})