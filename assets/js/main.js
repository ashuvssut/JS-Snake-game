//we have to first setup a game loop (see main()  <--this is the game loop)
//A game loop just repeats itself to constantly update game render in a manually set interval
//(eg..updating snake position, fruit, game calculations (basically, doing repaints)...)

import {snakeSpeed, setup as gameSetup, logic as gameLogic, input as gameInput, draw as gameDraw, gameOver, resume} from './game.js'

let lastRenderTime = 0;     //this GLOBAL variable stores the value of currentTime after calling 

const gameBoard = document.getElementById('game-board');

let key=null;
let key2=null;

//>>HAMMER.JS implementation
    // create a simple instance
    var gameBoardInstance = new Hammer(gameBoard);

    //Adding a tripletap event
        // We create a manager object, which is the same as Hammer(), but without the presetted recognizers. (example of presetted recognizers: 'panright')
        var gameBoardMO = new Hammer.Manager(gameBoard);

        // Default, tap recognizer
        gameBoardMO.add( new Hammer.Tap() ); //We have to add this 'tap' recognizer explicitly because manager object have no presetted recognizers

        // Tap recognizer with minimal 3 taps
        gameBoardMO.add( new Hammer.Tap({ event: 'tripletap', taps: 3 }) );

        // we want to recognize this simultaneous, so a tripletap will be detected even while a tap has been recognized.
        // the tap event will be emitted on every tap
        gameBoardMO.get('tripletap').recognizeWith('tap');

    // listen to events...
    gameBoardInstance.on("swipeleft", event => key = "ArrowLeft" );
    gameBoardInstance.on("swiperight", event => key = "ArrowRight" );
    gameBoardInstance.on("swipeup", event => key = "ArrowUp" );
    gameBoardInstance.on("swipedown", event => key = "ArrowDown" );
    gameBoardMO.on("tripletap", event => key = "C" );

document.addEventListener("keydown", function(event){
    key = event.key
});

// //Setup the resume key as P
// var waitingForEnter_P= false;
// function keydownHandler(event) {// refer https://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript
//     if (event.keyCode == 80 && waitingForEnter_P) {  //81 is the P key
//         resume=true;
//         waitingForEnter_P = false; // reset variable
//         key=key2;
//     }
//     else{
//         key2=key;
//         key = event.key;
//     }
// }
//     // register the handler method for the keydown event
// if (document.addEventListener) {
//     document.addEventListener('keydown', keydownHandler, false);
// }
// else if (document.attachEvent) {
//     document.attachEvent('onkeydown', keydownHandler);
// }


function main(currentTime){ //currentTime represents the 'time' when this function runs requestAnimationFrame() 
    
    while(!gameOver){
    
        window.requestAnimationFrame(main);
        let secondsSinceLastRender= (currentTime - lastRenderTime)/1000;//show the delay in each of those render frames

        // requestAnimationFrame() method tells the browser that you wish
        // to perform an animation and requests that the browser calls a specified 
        // function (here, its main()) to update an animation before the next repainting. 
        // The method takes  a callback as an argument to be invoked before the repaint.
        if(secondsSinceLastRender < 1 / snakeSpeed){
            return;
        }
        //we go below this line only of the above if statement stands false.


        //console.log("render");
        
        lastRenderTime = currentTime;//after executing window.requestAnimationFrame(main) currentTime is stored in lastRender time
        
        if (resume) {
            gameInput(key);
            gameLogic();
            gameDraw(gameBoard);
        }
        // else{
        //     waitingForEnter_P = true;
        // }
        //console.log(currentTime);
        //console.log(secondsSinceLastRender);
    
    
    }
}

//entry point
gameSetup();
window.requestAnimationFrame(main);

