angular
  	.module('RPSApp')
  	.service('ComputerService', ComputerService);

function ComputerService() {

 	var self = this;

 	//selects computer's icon from array using a random number between 0 and 2
 	self.computerSelect = function(){
 		var iconArray = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
 		var number = Math.floor(((Math.random() * 5)));
 		return iconArray[number];
 	}

}