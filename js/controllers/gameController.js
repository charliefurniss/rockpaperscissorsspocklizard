angular.module('RPSApp')
	.controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'GameStateService'];

function GameController($scope, $timeout, GameState){

	var self = this;

	self.enableButtonClick = false;              //enables/disables the click function on the main button
	self.enableIconClick = true;               //enables/disables the click function on the icon buttons
	self.gameState = GameState.gameState;		//the value of this boolean variable determines whether the main button or the icon buttons are showing
	self.winMessage = "";
	self.buttonMessage = "Click to play...";

	setVariables();
	clearIcons();

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
		var turn = 'rock';
		completeRound(turn);

		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightRock = true;         	//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightRock = false;		//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectPaper = function(){
		var turn = 'paper';
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightPaper = true;			//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightPaper = false;	//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectScissors = function(){
		var turn = 'scissors';
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightScissors = true;		//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightScissors = false;	//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectSpock = function(){
		var turn = 'spock';
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightSpock = true;			//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightSpock = false;	//uses ng-class to remove the above mentioned class
		}, 200, true);
	}

	self.selectLizard = function(){
		var turn = 'lizard';
		completeRound(turn);
		
		self.enableIconClick = false;		//disables click function on icon buttons
		self.highlightLizard = true;		//uses ng-class to add a class that changes the background colour of the relevant icon-button
		$timeout(function(){
			self.highlightLizard = false;	//uses ng-class to remove the above mentioned class
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
		console.log("player turn: " + playerTurn);
		console.log("comp turn: " + computerTurn);
		console.log("winner is " + winner);
		console.log("winMessage: " + self.winMessage);
		//calls for winMessage to be flashed
		flashMessage(winner);
	}

	//selects computer's icon from array using a random number between 0 and 2
	function computerSelect(){
		var iconArray = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
		var number = Math.floor(((Math.random() * 5)));
		return iconArray[number];
	}

	//calculates and return the name of the winner using Rock Paper Scissors rules
	function findWinner(playerTurn, computerTurn){
		if(playerTurn == computerTurn){
			return 'draw';
		} else {
			switch (playerTurn) {
			    case 'rock':
			        if(computerTurn == 'scissors' || computerTurn == 'lizard'){
			        	return "player";
			        } else {
			        	return "computer";
			        }
			        break;
			    case 'paper':
			        if(computerTurn == 'rock' || computerTurn == 'spock'){
			        	return "player";
			        } else {
			        	return "computer";
			        }
			        break;
			    case 'scissors':
			        if(computerTurn == 'paper' || computerTurn == 'lizard'){
			        	return "player";
			        } else {
			        	return "computer";
			        }
			        break;
			    case 'spock':
			        if(computerTurn == 'scissors' || computerTurn == 'rock'){
			        	return "player";
			        } else {
			        	return "computer";
			        }
			        break;
			    case 'lizard':
			        if(computerTurn == 'spock' || computerTurn == 'paper'){
			        	return "player";
			        } else {
			        	return "computer";
			        }
			        break;        
			    default:
			        winner = "";
			        break;
			}
		}
	}

	//returns message showing whether rock, paper, scissors, spock or lizard has won
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
				// hideMessage();
				// checkForChamp();
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
		console.log(self.playerScore);
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