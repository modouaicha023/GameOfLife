const gridContainer = document.querySelector('.grid');
const btnPlay = document.getElementById("play");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const inputSpeed = document.getElementById("speed");
const inputRows = document.getElementById("rows");
const inputColunms = document.getElementById("columns");
let interval = inputSpeed.value * 1000;
let intervalId;
let generation = 0;
let cellsMatrix = [];
let allCells = [];
function initMatrix(initRows, initCols) {
    return Array.from({ length: initRows }, () => Array.from({ length: initCols }).fill(0));
}

function updateCellClasses() {
    allCells.forEach((cell) => {
        const idCell = cell.id;
        const cellRow = Number(idCell.split("-")[0]);
        const cellCol = Number(idCell.split("-")[1]);
        cell.classList.toggle("alive", cellsMatrix[cellRow][cellCol] === 1);
    });
}

function createCellsElements(rows, cols, allCells) {
    gridContainer.innerHTML = "";
    // allCells = [];
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

function newRound(r, l) {




    // Step1 is to initialize the matrix with each case the value 0 
    cellsMatrix = initMatrix(inputRows.value, inputColunms.value);

    //Step2 is to create the cells elements in the dom with the length of this matrix
    createCellsElements(inputRows.value, inputColunms.value, allCells);

    // Step3 is update the  width and height of the  gridContainer element
    gridContainer.style.gridTemplateRows = `repeat(${inputRows.value}, 20px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${inputColunms.value}, 20px)`;

    // set alive some cell
    function setRandomAliveCell(Nrows, Ncolumns) {
        for (let index = 0; index < Nrows * Ncolumns; index++) {
            const randomRow = Math.floor(Math.random() * Nrows);
            const randomCol = Math.floor(Math.random() * Ncolumns);
            cellsMatrix[randomRow][randomCol] = 1;
        }
    }
    setRandomAliveCell(inputRows.value, inputColunms.value);
    updateCellClasses();


    function handleCellClick(cell) {
        const idCell = cell.id;
        const cellRow = Number(idCell.split("-")[0]);
        const cellCol = Number(idCell.split("-")[1]);
        cell.classList.toggle("alive");
        cellsMatrix[cellRow][cellCol] = 1 - cellsMatrix[cellRow][cellCol];
    }

    allCells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

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
        const numRows = cellsMatrix.length;
        const numCols = cellsMatrix[0].length;

        const updatedMatrix = initMatrix(numRows, numCols);

        cellsMatrix.forEach((row, i) => {
            row.forEach((col, j) => {
                const numNeighborsAlive = getAliveCellNeighbors(i, j).length;

                if (cellsMatrix[i][j] === 0 && numNeighborsAlive === 3) {
                    updatedMatrix[i][j] = 1;
                } else if (cellsMatrix[i][j] === 1 && (numNeighborsAlive === 3 || numNeighborsAlive === 2)) {
                    updatedMatrix[i][j] = 1;
                } else {
                    updatedMatrix[i][j] = 0;
                }
            });
        });

        cellsMatrix = updatedMatrix;
        updateCellClasses();
        generation++;
    }


    function startGame() {
        if (!intervalId) {
            intervalId = setInterval(UpdateCell, interval);
        }
        console.log("Game on play");
    }

    function stopGame() {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Game Stopped");
    }
    function resetGame() {
        stopGame();
        cellsMatrix = initMatrix(10, 10);
        updateCellClasses()

        // window.location.reload();
    }

    btnPlay.addEventListener("click", startGame);
    btnStop.addEventListener("click", stopGame);
    btnReset.addEventListener("click", resetGame);
}



inputRows.addEventListener("change", () => {
    clearInterval(intervalId);
    intervalId = null;
    newRound(inputRows.value, inputColunms.value);


});
inputColunms.addEventListener("change", () => {
    clearInterval(intervalId);
    intervalId = null;
    newRound(inputRows.value, inputColunms.value);

});


inputSpeed.addEventListener("change", () => {
    clearInterval(intervalId);
    intervalId = null;
    const speedValue = parseFloat(inputSpeed.value);
    if (!isNaN(speedValue) && speedValue > 0) {
        interval = speedValue * 1000;
    }
});

window.addEventListener('load', function () {
    newRound(inputRows.value, inputColunms.value);
    updateCellClasses()
});