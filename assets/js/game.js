export const snakeSpeed = 3;       //blocks covered per sec
export let gameOver=false, resume=true;
let printFruit=true;
let score;
//Making custom enum datatype
const direction = {STOP : 'STOP', UP : 'UP', LEFT : 'LEFT', DOWN : 'DOWN', RIGHT : 'RIGHT'};
let dir = direction.STOP;
let h, w;
let bodyCoordinateX = h/2; 
let bodyCoordinateY = w/2;
let fx, fy, tail=1; //(fx, fy) are fruit coordinates
const snakeBody = []; //This array store bodyPieces. each body piece has a x and a y coordinate value
class bodyCoordinate {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

export function setup() {
    dir = direction.STOP;
   // snakeBody = []  //clear array (actually we are creating a new array)
    gameOver = false;
    tail = 1;
    score = 0;
    h = 20; w = 20;
    bodyCoordinateX = h/2; 
    bodyCoordinateY = w/2;
    
    fx = Math.floor((Math.random())*w) + 1
    fy = Math.floor((Math.random())*h) + 1
}

export function input(key){
    if(key){
        switch (key) {
            case 'P':resume = false; break;
            case 'p':resume = false; break;

            case 'ArrowLeft': if (dir == direction.DOWN){ break; }  else{ dir = direction.UP; break; }
            case 'ArrowRight': if (dir == direction.UP){ break; } else{ dir = direction.DOWN; break; }
            case 'ArrowUp': if (dir == direction.RIGHT){ break; } else{ dir = direction.LEFT; break;}
            case 'ArrowDown': if (dir == direction.LEFT){ break; }  else{ dir = direction.RIGHT; break;}

            case 'C': dir = direction.STOP; break;
            case 'c': dir = direction.STOP; break;

            case 'X': gameOver = true; break;
            case 'x': gameOver = true; break;
        }
    }
}

export function logic(){
    if (bodyCoordinateX == fx && bodyCoordinateY == fy) {
		tail++; 
		score += 10;
		fx = Math.floor((Math.random())*w) + 1
        fy = Math.floor((Math.random())*h) + 1
        printFruit=true;
    }
    
	snakeBody.unshift(new bodyCoordinate(bodyCoordinateX, bodyCoordinateY));
	if (snakeBody.length > tail) { snakeBody.pop(); }

	switch (dir) {
	case 'UP': bodyCoordinateY -= 1; break;
	case 'LEFT': bodyCoordinateX -= 1; break;
	case 'DOWN': bodyCoordinateY +=1;  break;
	case 'RIGHT': bodyCoordinateX +=1; break;
	//case STOP: tail = 1; goto exePt;
	}

	// if (!(snakeBody.find(bodyCoordinate) == undefined)) {
	// 	gameOver = true;
	// }
		
    if (bodyCoordinateX<1 || bodyCoordinateX>w+1 || bodyCoordinateY<1 || bodyCoordinateY>h+1) {
		gameOver = true;
	}
}

export function draw(gameBoard){

    //clear all body pieces first
    
    while (document.querySelector(".snake")) {
        document.querySelector(".snake").remove();
    }

    snakeBody.forEach(bodyPiece => {
        
        //Prepare the snake body pieces...basically prepare a div to make it a grid that represents the bodyPiece and then just add it to the grid(gameBoard) as a child
        const snakeBodyPiece = document.createElement('div')
        snakeBodyPiece.style.gridRowStart = bodyPiece.x;
        snakeBodyPiece.style.gridColumnStart = bodyPiece.y;
        snakeBodyPiece.classList.add('snake');

        //set it as child of the grid base (gameBoard)
        gameBoard.appendChild(snakeBodyPiece);

        if (printFruit){
            //clear fruit div first
            for (var i = 0; i < document.querySelectorAll(".fruit").length; i++) {
                document.querySelectorAll('.fruit')[i].remove();
            }
            
            const fruit = document.createElement('div')
            fruit.style.gridRowStart = fx;
            fruit.style.gridColumnStart = fy;
            fruit.classList.add('fruit');
            //set it as child of the grid base (gameBoard)
            gameBoard.appendChild(fruit);
            printFruit=false;
        }
    });
}