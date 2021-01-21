	const levels =[ 
	//level 0
	["", "rocks", "", "", "",
	"", "rocks", "", "", "heroRight",
	"", "LaserGateVerticle", "animate", "animate", "animate",
	"LaserGateHorizontal", "fenceVerticle", "", "", "fenceHorizontal",
	"flag", "tree", "", "", "wand",],
	
	//level 1
	["", "rocks", "", "", "",
	"LaserGateHorizontal", "rocks", "", "", "",
	"heroLeft", "tree", "rocks", "fenceVerticle", "",
	"", "", "animate", "animate", "animate",
	"wand", "laserGateVerticle", "", "", "flag",],
	
	//level 2
	["heroLeft", "", "", "rocks", "",
	"", "rocks", "", "", "",
	"", "tree", "rocks", "LaserGateHorizontal", "",
	"", "fenceVerticle", "animate", "animate", "animate",
	"flag", "laserGateVerticle", "", "", "wand",]
	//end of levels
	
	];
	
	
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	var currentLevel = 0;//starting level
	var heroWand  = false; //does he have the wand
	var currentLocationOfHero = 0;
	var currentAnimation; //allows 1 animation per level
	
	//start game
	window.addEventListener("load", function(){
		loadLevel();
	})
	
	function loadLevel(){
		let levelMap = levels[currentLevel];
		let animateBoxes;
		riderOn = false;
		
		
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
		direction = "right"
	}else {
		index--;
	}
	}//else
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
}//animateEnemy