const gridContainer = document.querySelector('.grid');

let rows = 50;
let cols = 50;

gridContainer.style.gridTemplateColumns = `repeat(${cols ? cols : 100}, 20px)`;
gridContainer.style.gridTemplateRows = `repeat(${rows ? rows : 100}, 20px)`;


let cellsMatrix = initMatrix();
let AllCellNeigbors = [];

createCellsElements();


function initMatrix() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function createCellsElements() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `${i}-${j}`;
            gridContainer.appendChild(cell);
        }
    }
}

let allCells = document.querySelectorAll(".cell");
console.log(allCells);
const handleCellClick = (cell) => {
    const idCell = cell.id;
    const cellRow = Number(idCell.split("-")[0]);
    const cellCol = Number(idCell.split("-")[1]);

    checkRules(cellRow, cellCol);

    cellsMatrix[cellRow][cellCol] = cellsMatrix[cellRow][cellCol] === 1 ? 0 : 1;


    const neighbors = getAliveCellNeighbors(cellRow, cellCol);


}

allCells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell));

})



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

function UpdateCell() {
    cellsMatrix.forEach((row, i) => {
        row.forEach((col, j) => {
            checkRules(i, j);
        })
    });
}

function checkRules(row, col) {
    const numNeighborsAlive = getAliveCellNeighbors(row, col).length;

    const cell = document.getElementById(`${row}-${col}`)

    if (cellsMatrix[row][col] === 0 && numNeighborsAlive === 3) {
        cellsMatrix[row][col] = 1;
        cell.classList.add("alive");
    }
    if (cellsMatrix[row][col] === 1 && numNeighborsAlive <= 3) {
        cellsMatrix[row][col] = 1;
        cell.classList.add("alive");
    }
    else {
        cellsMatrix[row][col] = 0;
        cell.classList.remove("alive");
    }

}

let interval = .1 * 1000;// 1 seconde
setInterval(UpdateCell, interval)