const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = [
    'O'
]

function convertPositionToIndex(row , column) {
    return row * PLAYFIELD_COLUMNS + column;
}

let playField;
let tetromino;


function generatePlayField() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.grid').append(div);
    }

    playField = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0))
    // console.table(playField);
}

function generateTetromino() {
    
    tetromino = {
        name: TETROMINO_NAMES[0], 
        row: 3,
        column: 5
    }
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.grid div');





function drawPlayField() {
    // console.log(cells);
    cells[15].classList.add('O');
}

function drawTetromino() {
    for (let row = 0; row < 1; row++) {
        for (let column = 0; column < 1; column++) {
            
        }
    }
}

drawPlayField()
drawTetromino()