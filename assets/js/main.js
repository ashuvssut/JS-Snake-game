//we have to first setup a game loop (see main()  <--this is the game loop)
//A game loop just repeats itself to constantly update game render in a manually set interval
//(eg..updating snake position, food, game calculations (basically, doing repaints)...)

import {snakeSpeed, logic as gameLogic, update as gameUpdate, draw as gameDraw} from './game.js'


let lastRenderTime = 0;     //this GLOBAL variable stores the value of currentTime after calling 

const gameBoard = document.getElementById('game-board');

function main(currentTime){ //currentTime represents the 'time' when this function runs requestAnimationFrame() 
    while(!gameOver){
        if(resume){
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






            console.log("render");
            
            lastRenderTime = currentTime;//after executing window.requestAnimationFrame(main) currentTime is stored in lastRender time
            
            
            gameLogic();
            gameUpdate();
            gameDraw(gameBoard);
            //console.log(currentTime);
            //console.log(secondsSinceLastRender);
        }
    }
}

//entry point
window.requestAnimationFrame(main);
