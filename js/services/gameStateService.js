angular
  	.module('RPSApp')
  	.service('GameStateService', GameStateService);

function GameStateService() {

 	var self = this;

 	//stores a boolean value in a variable that is used to show/hide the main button and the icon buttons
 	self.gameState = true;

 	//toggles the value of that variable
 	self.toggleGameState = function(){
 		if(self.gameState){
 			self.gameState = false;
 		} else {
 			self.gameState = true;
 		}
 		return self.gameState;
 	}

}