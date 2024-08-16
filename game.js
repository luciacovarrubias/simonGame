var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level= 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("bien");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    startOver();
    }
}

// function nextSequence(){
//     userClickedPattern = [];

//     level++;
//     $("#level-title").text("Level "+level);

//     var randomNumber = Math.floor(Math.random()*4);
//     var randomChosenColour = buttonColours[randomNumber];
//     gamePattern.push(randomChosenColour);
    
//     $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColour);
    
// }

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var i = 0;

    function playSequence() {
        if (i < gamePattern.length) {
            var currentColorInSequence = gamePattern[i];
            // $("#"+ currentColorInSequence).animate(function(){
            //         0% {
            //           transform: translateY(0),
            //         }
            //         20% {
            //           transform: translateY(-30),
            //         }
            //         40% {
            //           transform: translateY(0),
            //         }
            //         60% {
            //           transform: translateY(-15),
            //         }
            //         100% {
            //           transform: translateY(0),
            //         }
            // });
            $("#" + currentColorInSequence).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(currentColorInSequence);
            i++;
            setTimeout(playSequence, 600);
        } else {

            setTimeout(function() {
                var randomNumber = Math.floor(Math.random() * 4);
                var randomChosenColour = buttonColours[randomNumber];
                gamePattern.push(randomChosenColour);

                $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(randomChosenColour);
            }, 300);
        }
    }

    // Inicia la reproducción de la secuencia
    playSequence();
}



function playSound (name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress (currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


