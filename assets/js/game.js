export const snakeSpeed = 1;       //blocks covered per sec

const snakeBody = [{x: 11, y: 11}];// initial pos given
                                //This array store bodyPieces. each body piece has a x and a y coordinate value

export function logic(){
    
}

export function update(){
    for()
}

export function draw(gameBoard){
    snakeBody.forEach(bodyPiece => {
        //Prepare the snake body pieces...basically prepare a div to make it a grid that represents the bodyPiece and then just add it to the grid(gameBoard) as a child
        const snakeBodyPiece = document.createElement('div')
        snakeBodyPiece.style.gridRowStart = bodyPiece.x;
        snakeBodyPiece.style.gridColumnStart = bodyPiece.y;
        snakeBodyPiece.classList.add('snake');
        //set it as child of the grid base (gameBoard)
        gameBoard.appendChild(snakeBodyPiece);
    });


}