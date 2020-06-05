export const snakeSpeed = 1;       //blocks covered per sec

const snakeBody = [{x: 11, y: 11}];// initial pos given
                                //This array store bodyPieces. each body piece has a x and a y coordinate value

export function update(){
    console.log("update");
}

export function draw(gameBoard){
    snakeBody.forEach(bodyPiece => {
        const snakeBodyPiece = document.createElement('div')
        snakeBodyPiece.style.gridRowStart = bodyPiece.x;
        snakeBodyPiece.style.gridColumnStart = bodyPiece.y;
    });
}