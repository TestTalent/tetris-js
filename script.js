const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
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
    'T': [
        [1,1,1],
        [0,1,0],
        [0,0,0]
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
    'I': [
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
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
    const columnTetromino = Math.floor((PLAYFIELD_COLUMNS - matrix.length) / 2);
    
    tetromino = {
        name, 
        matrix,
        row: 0,
        column: columnTetromino
    }
    

}

function placeTetromino() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if(tetromino.matrix[row][column]) {
                playField[tetromino.row + row][tetromino.column + column] = tetromino.name;
            }

        }
    }
    generateRandomTetromino();
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

let showRotated = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

function rotateTetromino() {
    const oldMatrix = tetromino.matrix;
    const newMatrix = rotateMatrix(tetromino.matrix);
    // showRotated = rotateMatrix(showRotated);
    tetromino.matrix = newMatrix;
    if(!isValid()) {
        tetromino.matrix = oldMatrix;
    }
}

draw();

function rotate() {
    rotateTetromino();
    draw();
}

function drawTetromino() {

    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            // check the result of the rotation
            // const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            // cells[cellIndex].innerHTML = showRotated[row][column];
            if(!tetromino.matrix[row][column]) continue;
                const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
                // console.log(cellIndex);
                cells[cellIndex].classList.add(tetromino.name);
        }
    }
}


function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayField();
    drawTetromino();
}


document.addEventListener('keydown', onKeyDown);
function onKeyDown(event) {
    switch(event.key) {
        case 'Control':
            console.log('Control');
            rotate();
            break;
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



function rotateMatrix(matrixTetromino) {
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for (let i = 0; i < N; i++) {
        rotateMatrix[i] = [];
        for (let j = 0; j < N; j++) {
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
        }
    }
    return rotateMatrix;
}

function moveTetrominoDown() {
    tetromino.row += 1;
    if(!isValid()) {
        tetromino.row -= 1;
        placeTetromino();
    }
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
    if(!isValid()) {
        tetromino.column += 1;
    }
}

function moveTetrominoRight() {
    tetromino.column += 1;
    if(!isValid()) {
        tetromino.column -= 1;
    }
}

function isValid() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            // if(tetromino.matrix[row][column]) continue;
            if(isOutsideOfPlayField(row, column)) {
                return false
            }
            if(hasCollisions(row, column)) {
                return false
            }
        }
        
    }
    return true;
}

function isOutsideOfPlayField(row, column) {
    return tetromino.matrix[row][column] &&
    (
        tetromino.column + column < 0 
        || tetromino.column + column >= PLAYFIELD_COLUMNS 
        || tetromino.row + row >= playField.length
    )
}

function hasCollisions(row, column) {
    return tetromino.matrix[row][column]
    && playField[tetromino.row + row][tetromino.column + column] !== 0;

}