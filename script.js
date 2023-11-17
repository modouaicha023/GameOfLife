const gridContainer = document.querySelector('.grid');

let rows = 100;
let cols = 100;

function initMatrix() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

gridContainer.style.gridTemplateColumns = `repeat(${cols ? cols : 100}, 20px)`;
gridContainer.style.gridTemplateRows = `repeat(${rows ? rows : 100}, 20px)`;


let cellsMatrix = initMatrix();
cellsMatrix[4][9] = 1;
cellsMatrix[4][10] = 1;
cellsMatrix[4][11] = 1;
cellsMatrix[3][11] = 1;
cellsMatrix[2][10] = 1;
cellsMatrix[8][7] = 1;
cellsMatrix[8][5] = 1;
cellsMatrix[8][6] = 1;
let allCells = [];

createCellsElements();


function createCellsElements() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `${i}-${j}`;
            gridContainer.appendChild(cell);
            allCells.push(cell);
        }
    }
}

updateCellClasses();

allCells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
    const idCell = cell.id;
    const cellRow = Number(idCell.split("-")[0]);
    const cellCol = Number(idCell.split("-")[1]);
    cellsMatrix[cellRow][cellCol] = 1 - cellsMatrix[cellRow][cellCol];
    updateCellClasses();
}

function getAliveCellNeighbors(row, col) {
    let neighbors = [];

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < cellsMatrix.length && j >= 0 && j < cellsMatrix[0].length) {
                if (!(i === row && j === col) && cellsMatrix[i][j] === 1) {
                    neighbors = [...neighbors, { "row": i, "col": j }];
                }
            }
        }
    }

    return neighbors;
}

let generation = 0;

function UpdateCell() {
    const updatedMatrix = initMatrix();
    cellsMatrix.forEach((row, i) => {
        row.forEach((col, j) => {
            const numNeighborsAlive = getAliveCellNeighbors(i, j).length;

            if (cellsMatrix[i][j] === 0 && numNeighborsAlive === 3) {
                updatedMatrix[i][j] = 1;
            } else if (cellsMatrix[i][j] === 1 && (numNeighborsAlive === 3 || numNeighborsAlive === 2)) {
                updatedMatrix[i][j] = 1;
            } else if (numNeighborsAlive < 2 || numNeighborsAlive > 3) {
                updatedMatrix[i][j] = 0;
            }
        });
    });

    cellsMatrix = updatedMatrix;
    updateCellClasses();
    generation++;
}

function updateCellClasses() {
    allCells.forEach((cell) => {
        const idCell = cell.id;
        const cellRow = Number(idCell.split("-")[0]);
        const cellCol = Number(idCell.split("-")[1]);
        cell.classList.toggle("alive", cellsMatrix[cellRow][cellCol] === 1);
    });
}

let interval = .1 * 1000; // 1 second
// setInterval(UpdateCell, interval);