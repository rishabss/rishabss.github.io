	const levels =[ 
	//level 0
	["", "LaserGateVerticle", "heroRight", "", "",
	"", "rocks", "water", "bridge", "water",
	"", "rocks", "animate", "animate", "animate",
	"", "fenceVerticle", "", "", "fenceHorizontal",
	"flag", "tree", "", "", "wand",],
	
	//level 1
	["flag", "rocks", "wand", "", "",
	"", "rocks", "", "", "",
	"LaserGateHorizontal", "fenceHorizontal", "fenceHorizontal", "fenceHorizontal", "",
	"", "animate", "animate", "animate", "",
	"heroLeft", "tree", "", "tree", "",],
	
	//level 2
	["tree", "", "", "rocks", "tree",
	"heroLeft", "", "", "", "",
	"LaserGateHorizontal", "rocks", "rocks", "fenceHorizontal", "",
	"", "LaserGateVerticle", "animate", "animate", "animate",
	"flag", "fenceVerticle", "", "", "wand",],
	//level 3
	["flag", "water", "", "fenceVerticle", "tree",
	"", "water", "", "LaserGateVerticle", "",
	"LaserGateHorizontal", "water", "", "fenceVerticle", "",
	"", "bridge animate", "animate", "animate", "animate",
	"heroLeft", "water", "bridge", "water", "wand",]

	];
	
	
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	const noPassObsticals = ["rocks", "tree", "fenceVerticle", "water", "fenceHorizontal"];
	var currentLevel = 0;//starting level
	var heroWand  = false; //does he have the wand
	var currentLocationOfHero = 0;
	var currentAnimation; //allows 1 animation per level
	var widthOfBoard = 5;
	//start game
	window.addEventListener("load", function(){
		showLightBox("Welcome to Hero Adventure!","The goal of the game is to reach the flag. Move around using the arrow keys. Dont get hit by the enemy. You can only pass through laser gates once you have colected your wand", "Play Game");
	});
//move hero
function startGame() {
	document.onkeydown = function (e) {keydownEventListener(e);};
}

function keydownEventListener(e) {
		

		switch(e.keyCode){
			case 37: //left arrow
			if (currentLocationOfHero % widthOfBoard !== 0) {
				tryToMove("Left");

			}
			break;
			case 38: //up arrow
			if (currentLocationOfHero - widthOfBoard >= 0) {
				tryToMove("Up");
			}
			break;
			case 39: //right left
			if (currentLocationOfHero % widthOfBoard < widthOfBoard - 1) {
				tryToMove("Right");
			}
			break;
			case 40: //down arrow
			if (currentLocationOfHero + widthOfBoard < widthOfBoard * widthOfBoard) {
				tryToMove("Down");
			}
			break;
		}//switch
} //key event Listen
	
	//try to move hero
	function tryToMove(direction){
		
		//location before move
		let oldLocation = currentLocationOfHero;
		
		//class of location before move
		let oldClassName  = gridBoxes[oldLocation].className;
		
		let nextLocation = 0; //location we wish to move to
		let nextClass = "";   // class of location we wish to move to

		let nextLocation2 = 0;
		let nextClass2 = "";
		
		let newClass = ""; //new class to switch ot if move succesful
		
		
		switch (direction) {
			case "Left":
			console.log("left");
			nextLocation = currentLocationOfHero - 1;
			break;
			
			case "Right":
			nextLocation = currentLocationOfHero + 1;
			console.log("right");
			break;
			
			case "Up":
			nextLocation = currentLocationOfHero - widthOfBoard;
			console.log("up");
			break;


			case "Down":
			nextLocation = currentLocationOfHero + widthOfBoard;
			console.log("down");
			break;
		}//switch
		
		nextClass = gridBoxes[nextLocation].className;

		//if the obstical is not passable, dont move
		if (noPassObsticals.includes(nextClass)) {return;}

		//if obstical is a gate and there is no wand dont move
		if (heroWand == false && nextClass.includes("Gate")) {return;}
		
		//if there is a wand and the hero has the wand move two spaces with animation
		if (nextClass.includes("Gate")) {

			//wand must be had to open gates
			if (heroWand) {
				gridBoxes[currentLocationOfHero].className = "";
				oldClassName = gridBoxes[nextLocation].className;

				//set values according to direction
				if (direction == "Left") {
					nextClass  = "heroGateLeft";
					nextClass2 = "heroWandLeft";
					nextLocation2 = nextLocation - 1;
				} else if (direction == "Right") {
					nextClass = "heroGateRight";
					nextClass2 = "heroWandRight";
					nextLocation2 = nextLocation +1;
				} else if (direction == "Up") {
					nextClass = "heroGateUp";
					nextClass2 = "heroWandUp";
					nextLocation2 = nextLocation - widthOfBoard;
				}else if (direction == "Down") {
					nextClass = "heroGateDown";
					nextClass2 = "heroWandDown";
					nextLocation2 = nextLocation + widthOfBoard;
				}
				
				//show hero using wand
				gridBoxes[nextLocation].className = nextClass;

				setTimeout(function() {

					//set gate back to closed
					gridBoxes[nextLocation].className = oldClassName;

					//update curreent location of hero to be two spaces past take off
					currentLocationOfHero = nextLocation2;

					//get class of box after gate
					nextClass = gridBoxes[currentLocationOfHero].className;

					//sow hero and wand on other side of gate
					gridBoxes[currentLocationOfHero].className = nextClass2

					//if next box is a flag, go up  a level
					levelUp(nextClass);

				}, 350);
				return;


			}//if

		}//if class has gate

		//if is a wand, add a wand
		if (nextClass == "wand") {
			heroWand = true;
		}//if
		//if there is a bridge in the old location keep it
		if (oldClassName.includes("bridge")) {
			gridBoxes[oldLocation].className = "bridge";
		}else{
			gridBoxes[oldLocation].className = "";
		}//else

		//build name of new class
		newClass =  (heroWand) ? "heroWand" : "hero";
		newClass += direction;

		//if there is a bridge in the next location keep it
		if (gridBoxes[nextLocation].classList.contains("bridge")) {
			newClass += " bridge";
		}
		//move one space
		currentLocationOfHero = nextLocation;
		gridBoxes[currentLocationOfHero].className = newClass;

		//if it is an enemy 
		if (nextClass.includes("enemy")) {
			showLightBox("You lose", "" ,"Try Again?");	
		startGame();
		}

		if (oldClassName.includes("flag")) {
			console.log("touching flag");
			gridBoxes[oldLocation].className = "flag";
		}

		//move up a level if needed
		levelUp(nextClass);


		
	}//tryToMove
	
	//move up a level
	function levelUp(nextClass){
		if (nextClass == "flag" && heroWand) {
			heroWand = false;
			currentLevel++;
				if(currentLevel < 4){
					document.getElementById("levelup").style.display = "block";
			clearTimeout(currentAnimation);
			
			setTimeout(function(){
				document.getElementById("levelup").style.display = "none";
				loadLevel();		
					}, 1000);
				}else{
					heroWand = false;
					showLightBox("You Win!", "","Play Again?");
				}
		}//if
	
	}//levelUp



	function loadLevel(){
		let levelMap = levels[currentLevel];
		let animateBoxes;
		heroWand = false;
		
		
		//load the board
		for(i = 0; i < gridBoxes.length; i++ ){
			gridBoxes[i].className = levelMap[i];
			if(levelMap[i].includes("hero")) {
				 currentLocationOfHero = i;
			}//if
		}//for i 
		
		animateBoxes = document.querySelectorAll(".animate");
		
		animateEnemy(animateBoxes, 0, "right");
		
	}//load level
	
//animate enemy left to right (could add up or down to this)
//boxes - array of grid boxes that include animation
//index - current location of animation
//direction - current direction of animation
function animateEnemy(boxes, index, direction){
	//exit function if no animation
	if(boxes.length <= 0){return;}//if
	
	//update images
	if(direction == "right"){
		boxes[index].classList.add("enemyRight");
	}else{
		boxes[index].classList.add("enemyLeft");	
	}//else
		
	//remove images from old boxes
	for(i =0; i < boxes.length; i ++){
		if(i != index){
			boxes[i].classList.remove("enemyLeft");
			boxes[i].classList.remove("enemyRight");
		}//if 
		
	}//for
	//moving right
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length - 1){
			index--;
			direction = "left";
			}else{
				index++;
			}//else
	//moving left
	}else {
		//turn around if hit left side
	if(index == 0) {
		index++;
		direction = "right";
	}else {
		index--;
	}
	}//else
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
}//animateEnemy

function changeVisibility(divID){
	var element = document.getElementById(divID);
	//if element exists, it is considered true
	if (element) {
		element.className = (element.className == 'hidden') ? 'unhidden' : 'hidden';
	}//if
} //changeVisibility
function showLightBox(message, message2, message3){

	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message3").innerHTML = message2;
	document.getElementById("message2").innerHTML = message3;

	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	currentLevel = 0;
	heroWand  = false;
	currentLocationOfHero = 0;
	clearTimeout(currentAnimation);
	loadLevel();
	startGame();
}//contineuGame