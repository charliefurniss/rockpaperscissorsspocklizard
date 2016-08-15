angular
  	.module('RPSApp')
  	.service('WinnerService', WinnerService);

function WinnerService() {

 	var self = this;

 	//calculates and return the name of the winner using Rock Paper Scissors rules
 	self.findWinner = function(playerTurn, computerTurn){
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

}