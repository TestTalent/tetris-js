const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 10;
const TETROMINO_NAMES = [
    'O',
    'J',
    'L',
    'I',
    'S',
    'Z',
    'T'
]
const TETROMINOES = {
    'O' : [
        [1, 1],
        [1, 1]
    ],
    'J' : [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    'L' : [
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ],
    'I': [
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ],
    'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ]
}

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
}

function generateRandomTetromino() {
    const index = Math.floor(Math.random() * TETROMINO_NAMES.length);
    const name = TETROMINO_NAMES[index];
    const matrix = TETROMINOES[name];
    
    tetromino = {
        name, 
        matrix,
        row: 0,
        column: 3
    }

}

generatePlayField();
generateRandomTetromino();
const cells = document.querySelectorAll('.grid div');

function drawPlayField() {
    
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if(playField[row][column] === 0) continue;
            
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino() {

    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if(!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            console.log(cellIndex);
            cells[cellIndex].classList.add(tetromino.name);
        }
    }
}


function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayField();
    drawTetromino();
}

draw();


document.addEventListener('keydown', onKeyDown);
function onKeyDown(event) {
    switch(event.key) {
        case 'ArrowDown':
            console.log('ArrowDown');
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            moveTetrominoRight();
            break;
    }
    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
}

function moveTetrominoRight() {
    tetromino.column += 1;
}