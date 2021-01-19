let currentPlayer = "X";
let gameStatus = ""; // "" - continue, "Tie", "X wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];


//reset the board and all variables
function newGame(){
	//reset the board

	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";

	}

	//reset variables
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";

	changeVisibility("controls");

}//new game


//take player turn
function playerTakeTurn(e){
	
	if(e.innerHTML == ""){
		currentPlayer = "X";
		e.innerHTML = currentPlayer;
		checkGameStatus();

		//game not over, computer goes
		if (gameStatus == "") {
			currentPlayer = "O";
				setTimeout(function() {
					computerTakeTurn();
					checkGameStatus();
				},500
			);
			
		}//if

	//game is over


	} else{
		showLightBox("This box is already selected."," Please try another" );
		return;
	}//else
	
}//playerTakeTurn

//After each turn, check for a winne, a tie,
//or continue playing
function checkGameStatus(){

	numTurns++; //count turn
	
	//check for a win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
	}//if
	

	
		if(gameStatus != ""){
		setTimeout(function(){showLightBox(gameStatus, "Game Over.");},500);
	}//if
	
}// checkGameStatus

//check for a Win, there are 8 win paths
function checkWin(){
	let cb = []; //current Board
	cb[0] = ""; //not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	//top row 
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	}//if
	
	//middle row
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	}//if
	
	//bottem row
	if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}//if
	
	//first collum
	if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	}//if
	
	//second collum
	if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	}//if
	
	//third collum
	if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	}//if
	
	//digonal left going down
	if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	}//if
	
	
	//digonal right going down
	if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	}//if

	else{
				//check for tie
		if(numTurns == 9){
			gameStatus  = "Game Tie";
		}//numTurns
	}//else
	


}//check win

function changeVisibility(divID){
	var element = document.getElementById(divID);
	//if element exists, it is considered true
	if (element) {
		element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
	}//if
} //changeVisibility


// display message in Lightbox
function showLightBox(message, message2){

	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

}//showLightBox

//close light box
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

	//if game is over, show controls
	if (gameStatus != "") {
		changeVisibility("controls");
	}//if
}//contineuGame


function computerTakeTurn() {
	let idName = "";

	//turn number one
	if (numTurns == 1) {
		if (document.getElementById(idNames[4]).innerHTML  == ""){
			document.getElementById(idNames[4]).innerHTML = currentPlayer;
		} //if
		else{
			do{
				let rand = parseInt(Math.random()*4) + 1; //1-4
				if (rand == 1) {
					document.getElementById(idNames[0]).innerHTML = currentPlayer;
				}//if

				if (rand == 2) {
					document.getElementById(idNames[2]).innerHTML = currentPlayer;
				}//if

				if (rand == 3) {
					document.getElementById(idNames[6]).innerHTML = currentPlayer;
				}//if

				if (rand == 4) {
					document.getElementById(idNames[8]).innerHTML = currentPlayer;
				}//if
				break;

			}while(true);
		}//else
	}//if
	
	
	
	if (numTurns == 3) {
		blockWin();

			
	}//if

	if (numTurns == 5) {
		blockWin();
	}

	if (numTurns == 7) {

		blockWin();
	}

	if (numTurns == 9) {
		
		blockWin();
	}

	//last effortgenerate random boxes till and empty box is found
	
}//computer take turn

function blockWin() {
	
	do{

			
			if (document.getElementById("one").innerHTML == "X" && document.getElementById("three").innerHTML == "X" ) {		
				if (document.getElementById("two").innerHTML == "") {
					document.getElementById("two").innerHTML = currentPlayer;
					console.log("line 213");
				break;
				}//if
			}//if

			else if (document.getElementById("one").innerHTML == "X" && document.getElementById("two").innerHTML == "X" ) {		
				if (document.getElementById("three").innerHTML == "") {
					document.getElementById("three").innerHTML = currentPlayer;
					console.log("line 223");
				break;
				}//if
			}//if

			
			else if (document.getElementById("two").innerHTML == "X" && document.getElementById("three").innerHTML == "X" ) {		
				if (document.getElementById("one").innerHTML == "") {
					document.getElementById("one").innerHTML = currentPlayer;
					console.log("line 232");
				break;
				}//if
			}//if

			//middle row
			
			
			else if (document.getElementById("four").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("six").innerHTML == "") {
					document.getElementById("six").innerHTML = currentPlayer;
					console.log("line 242");
				break;
				}//if
			}//if

			else if (document.getElementById("six").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("four").innerHTML == "") {
					document.getElementById("four").innerHTML = currentPlayer;
					console.log("line 250");
				break;
				}//if
			}//if

			
			else if (document.getElementById("six").innerHTML == "X" && document.getElementById("four").innerHTML == "X" ) {		
				if (document.getElementById("five").innerHTML == "") {
					document.getElementById("five").innerHTML = currentPlayer;
					console.log("line 259");
				break;
				}//if
			}//if
			//bottem row
			else if (document.getElementById("seven").innerHTML == "X" && document.getElementById("eight").innerHTML == "X" ) {		
				if (document.getElementById("nine").innerHTML == "") {
					document.getElementById("nine").innerHTML = currentPlayer;
					console.log("line 267");
				break;
				}//if
			}//if

			else if (document.getElementById("seven").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("eight").innerHTML == "") {
					document.getElementById("eight").innerHTML = currentPlayer;
					console.log("line 275");
				break;
				}//if
			}//if

			
			else if (document.getElementById("eight").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("seven").innerHTML == "") {
					document.getElementById("seven").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			//collums
			//first collum
			else if (document.getElementById("one").innerHTML == "X" && document.getElementById("four").innerHTML == "X" ) {		
				if (document.getElementById("seven").innerHTML == "") {
					document.getElementById("seven").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			else if (document.getElementById("one").innerHTML == "X" && document.getElementById("seven").innerHTML == "X" ) {		
				if (document.getElementById("four").innerHTML == "") {
					document.getElementById("four").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			
			else if (document.getElementById("four").innerHTML == "X" && document.getElementById("seven").innerHTML == "X" ) {		
				if (document.getElementById("one").innerHTML == "") {
					document.getElementById("one").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			//middle collum
			
			
			else if (document.getElementById("two").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("eight").innerHTML == "") {
					document.getElementById("eight").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			else if (document.getElementById("eight").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("two").innerHTML == "") {
					document.getElementById("two").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			
			else if (document.getElementById("two").innerHTML == "X" && document.getElementById("eight").innerHTML == "X" ) {		
				if (document.getElementById("five").innerHTML == "") {
					document.getElementById("five").innerHTML = currentPlayer;
				break;
				}//if
			}//if
			//left collum
			else if (document.getElementById("three").innerHTML == "X" && document.getElementById("six").innerHTML == "X" ) {		
				if (document.getElementById("nine").innerHTML == "") {
					document.getElementById("nine").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			else if (document.getElementById("three").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("six").innerHTML == "") {
					document.getElementById("six").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			
			else if (document.getElementById("six").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("three").innerHTML == "") {
					document.getElementById("three").innerHTML = currentPlayer;
				break;
				}//if
			}//if
			//diagonal left
			else if (document.getElementById("one").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("nine").innerHTML == "") {
					document.getElementById("nine").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			else if (document.getElementById("one").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("five").innerHTML == "") {
					document.getElementById("five").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			
			else if (document.getElementById("five").innerHTML == "X" && document.getElementById("nine").innerHTML == "X" ) {		
				if (document.getElementById("one").innerHTML == "") {
					document.getElementById("one").innerHTML = currentPlayer;
				break;

			}//if
		}//if

			//diagonal right
			else if (document.getElementById("three").innerHTML == "X" && document.getElementById("five").innerHTML == "X" ) {		
				if (document.getElementById("seven").innerHTML == "") {
					document.getElementById("seven").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			else if (document.getElementById("three").innerHTML == "X" && document.getElementById("seven").innerHTML == "X" ) {		
				if (document.getElementById("five").innerHTML == "") {
					document.getElementById("five").innerHTML = currentPlayer;
				break;
				}//if
			}//if

			
			else if (document.getElementById("five").innerHTML == "X" && document.getElementById("seven").innerHTML == "X" ) {		
				if (document.getElementById("three").innerHTML == "") {
					document.getElementById("three").innerHTML = currentPlayer;
				break;

			}//if
		}//if

			let rand = parseInt(Math.random()*9) + 1;

			switch(rand){



				
			case 1 : if (document.getElementById("one").innerHTML == "") {
					document.getElementById("one").innerHTML = currentPlayer;
				break;
			}
			case 2 : if (document.getElementById("two").innerHTML == "") {
					document.getElementById("two").innerHTML = currentPlayer;
				break;
				}
			case 3 : if (document.getElementById("three").innerHTML == "") {
					document.getElementById("three").innerHTML = currentPlayer;
				break;
				}
			case 4 : if (document.getElementById("four").innerHTML == "") {
					document.getElementById("four").innerHTML = currentPlayer;
				break;
				}
			case 5 : if (document.getElementById("five").innerHTML == "") {
					document.getElementById("five").innerHTML = currentPlayer;
				break;
				}
			case 6 : if (document.getElementById("six").innerHTML == "") {
					document.getElementById("six").innerHTML = currentPlayer;
				break;
				}
			case 7 :if (document.getElementById("seven").innerHTML == "") {
					document.getElementById("seven").innerHTML = currentPlayer;
				break;
				}
				case 8 :if (document.getElementById("eight").innerHTML == "") {
					document.getElementById("eight").innerHTML = currentPlayer;
				break;
				}
				
				case 9 : if (document.getElementById("nine").innerHTML == "") {
					document.getElementById("nine").innerHTML = currentPlayer;
				break;
				}
			


			}//switch

			
			break;


		}while(true);
}//blockWin


