//alert("hello");
//Note: the all the console.log are used for testing and also can be used as cheating code to the programmer of course
//unless the user run the game on the developer mode inside the browser

//each list item reprensents a button
var buttonColors = ["red","blue","green","yellow"];
//lists to save user and computer generated patterns
var gamePattern=[];
var userClickedPattern=[];

//check and initate game start and levels
var started = false;
var level = 0;

function nextSequence(){
	// reset user answers
	userClickedPattern=[]; 
	// increase the level each time the function is called variable used
	level++; 
	$("#level-title").text("level:"+level);
	//generate all the components:color, sound and list append
	var randomChosenColor="";
	var randomNum= Math.floor(Math.random()*4);
	randomChosenColor = buttonColors[randomNum];
	gamePattern.push(randomChosenColor);// add one more pattern after each round
  console.log("game List "+gamePattern);
	//Play user selected pattern
	 playSound(randomChosenColor);
	 animatedBtn(randomChosenColor);
	 console.log("Hello from next Sequence "+level);
	 console.log("random Chosen Color: "+randomChosenColor);
}

//press the start button to start the game
$("#startBtn").on("click", function(){
	if(!started){
		$("#level-title").text("level:"+level);
	animatedBtn("startBtn");
	nextSequence();
	started =true;
	}
});

//this is the heart of the game
$(".btn").click(function(){
	var userClickedColor = $(this).attr("id");
	console.log("user clicked button: "+userClickedColor);
//update user selection pattern list
userClickedPattern.push(userClickedColor);
playSound(userClickedColor);
animatedBtn(userClickedColor);
//check user's answer each time
checkAnswer(userClickedPattern.length-1);
console.log("User list "+userClickedPattern);
});

//The main function is to check user vs generated patterns
function checkAnswer(currentLevel){
	//compare both lists (user and generated)
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
	if(userClickedPattern.length==gamePattern.length){
		//give user time to enter their answers before calling the next Sequence
		setTimeout(function(){nextSequence(); },1000);
		console.log("hello from answer checked: winning section");
	}

//if user patter doesn't match generated then this section take over
}else{
	//set wrong answer game environment
	playSound("wrong");
	$("body").addClass("game-over");
	$("#level-title").text("Game over, Press Start to Restart");
	//remove the game over class to retart before restarting the game
	//this happened really fast 0.2 second
	setTimeout(function(){$("body").removeClass("game-over");},200);
	startOver();
	console.log("hello from answer checked: loosing section");
}
}

//play sound function
//playing the audio associated with chosen button color
function playSound(btnColor){
	var audio = new Audio("sounds/" + btnColor + ".mp3");
   audio.play();
}

//add animation to the game
function animatedBtn(btnColor){
//fade in and out animation part 1
	$("#"+btnColor).fadeIn(100).fadeOut(100).fadeIn(100);
//add animation part 2 pressed class then removed after 1 milsec
	$("#"+btnColor).addClass("pressed");
	setTimeout(function(){$("#"+btnColor).removeClass("pressed"); },100);
}

//this function reset everything: levels, pattern and start status
function startOver(){
	level =0;
	gamePattern=[];
	started = 0;
}