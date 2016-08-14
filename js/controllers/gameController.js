angular.module('RPSApp')
	.controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'GameStateService'];

function GameController($scope, $timeout, GameState){

	var self = this;

	self.enableButtonClick = true;              //enables/disables the click function on the main button
	self.enableIconClick = false;               //enables/disables the click function on the icon buttons
	self.gameState = GameState.gameState;		//the value of this boolean variable determines whether the main button or the icon buttons are showing
	self.winMessage = "";
	self.buttonMessage = "Click to play...";

	setVariables();

	self.startGame = function(){
		self.enableButtonClick = false;
		clearIcons();
		setVariables();
		startNewRound();
	}

	function startNewRound(){
		self.enableIconClick = true;
		clearIcons();
		startCountdown();
	}

	//shows a blank image in the icon boxes
	function clearIcons(){
		self.playerIconURL = "images/blank.png";
		self.computerIconURL = "images/blank.png";
	}

	function setVariables(){
		self.playerScore = 0;
		self.computerScore = 0;
		self.champ = "";
		self.highlightStartButton = false;
		self.highlightRock = false;
		self.highlightPaper = false;
		self.highlightScissors = false;
	}

	//Clears buttonMessage then initiates a countdown by iterating through 
	//array with a 1 sec interval between each iteration, when the relevant 
	//step in the array is passed to the self.buttonMessage variable
	function startCountdown(){
		self.buttonMessage = "";

		var countdownArray = ["Ready?", "Ready?", "3", "2", "1"];
		var i = 0;
		function startLoop(){
			self.buttonMessage = countdownArray[i];
			$timeout(function(){
				if(i < countdownArray.length - 1){
					i++;
					startLoop();
				} else {
					self.gameState = GameState.toggleGameState();
				}
			}, 1000);
		}

		startLoop();
	}

	/// responds to player clicking on rock button by
	self.selectRock = function(){
		var turn = "rock";
		completeRound(turn);

		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightRock = true;         	//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightRock = false;		//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectPaper = function(){
		var turn = "paper";
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightPaper = true;			//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightPaper = false;	//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectScissors = function(){
		var turn = "scissors";
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightScissors = true;		//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightScissors = false;	//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	function completeRound(playerTurn){
		//calls for computer turn
		var computerTurn = computerSelect();
		//calls for the relevant image based on computer and player's turns
		self.playerIconURL = "images/" + playerTurn + ".png";
		self.computerIconURL = "images/" + computerTurn + ".png";
		
		//stores winner in a variable
		var winner = findWinner(playerTurn, computerTurn);

		//sets the winMessage that displays the winning turn in the icon boxes
		self.winMessage = createWinMessage(winner, playerTurn, computerTurn);

		//calls for winMessage to be flashed
		flashMessage(winner);
	}

	//selects computer's icon from array using a random number between 0 and 2
	function computerSelect(){
		var iconArray = ["rock", "paper", "scissors"];
		var number = Math.floor(((Math.random() * 3)));
		return iconArray[number];
	}

	//calculates and return the name of the winner using Rock Paper Scissors rules
	function findWinner(playerTurn, computerTurn){
		if (playerTurn === computerTurn){
			return "draw";
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			return "player";
		} else {
			return "computer";
		}
	}

	//returns message showing whether rock, paper or scissors has won
	function createWinMessage(winner, playerTurn, computerTurn){
		if (winner == "draw"){
			return "It's a draw!";
		} else if (winner == "player") {
			return playerTurn + " wins!";
		} else {
			return computerTurn + " wins!";
		}
	}

	//shows message after 2 seconds and then hides it, increases score and checks for champion after an additional 2 seconds
	function flashMessage(winner){
		$timeout(function(){
			showMessage(winner);
			$timeout(function(){
				increaseScore(winner);
				hideMessage();
				checkForChamp();
			}, 2000, true);
		}, 2000);
	}

	//shows relevant winner message(s) in relevant box(es)
	function showMessage(winner){
		if (winner == "draw"){
			self.showPlayerWinMessage = true;
			self.showComputerWinMessage = true;
		}
		else if (winner == "player"){
			self.showPlayerWinMessage = true;
		} else {
			self.showComputerWinMessage = true;
		}
	}

	//hides winner messages
	function hideMessage(){
		self.showPlayerWinMessage = false;
		self.showComputerWinMessage = false;
	}

	//increases score of the winner
	function increaseScore(winner){
		if(winner == "player"){
			self.playerScore++;
		} else if (winner == "computer"){
			self.computerScore++;
		}
	}

	//checks to see if either player has 2 points and continues game if not
	function checkForChamp(){
		if((self.playerScore != 2) && (self.computerScore != 2)){
			self.gameState = GameState.toggleGameState();
			startNewRound();
		} else {
			identifyChamp();
		}
	}

	//identifies which player has won and displays
	function identifyChamp(){
		self.highlightStartButton = true;  	//uses ng-class to add a class that changes the background colour of the main button
		self.enableButtonClick = true;		//enables the click function of the main button
		
		//identifies the champion
		if (self.playerScore == 2) {
			self.champ = "Player";			
		} else if (self.computerScore == 2){
			self.champ = "Computer";
		}
		//displays name of champion in the main box
		self.buttonMessage = self.champ + " wins!!! Click to play again..."

		//hides the icon buttons and shows the main button
		self.gameState = GameState.toggleGameState();
	}
	
}