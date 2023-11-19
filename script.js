const gridContainer = document.querySelector('.grid');
const btnPlay = document.getElementById("play");
const btnStop = document.getElementById("stop");
const btnClear = document.getElementById("clear");
const btnRandom = document.getElementById("random");
const btnReset = document.getElementById("reset");
const inputSpeed = document.getElementById("speed");
const inputRows = document.getElementById("rows");
const inputColunms = document.getElementById("columns");
const inputRateRandomCells = document.getElementById("rateRandomCells");
let interval = inputSpeed.value * 1000;
let intervalId;
let generation = 0;
let cellsMatrix = [];
let allCells = [];

//this function initialize a new matrice 
function initMatrix(initRows, initCols) {
    return Array.from({ length: initRows }, () => Array.from({ length: initCols }).fill(0));
}

//this function update the state of all the cell depends of their value in the Matrix ---> cellMatrix
function updateCellClasses() {
    allCells.forEach((cell) => {
        const idCell = cell.id;
        const cellRow = Number(idCell.split("-")[0]);
        const cellCol = Number(idCell.split("-")[1]);
        cell.classList.toggle("alive", cellsMatrix[cellRow][cellCol] === 1);
    });
}

//this function create the cell elments and add their them in array --> allCells
function createCellsElements(rows, cols, allCells) {
    gridContainer.innerHTML = "";
    allCells.length = 0;
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

//this function init a new Round of a game depends of the value of the rows and cols  ---> inputRows && inputCols 
function newRound(r, l) {

    // Step1 is to initialize the matrix with each case the value 0
    cellsMatrix = initMatrix(inputRows.value, inputColunms.value);

    //Step2 is to create the cells elements in the dom with the length of this matrix
    createCellsElements(inputRows.value, inputColunms.value, allCells);

    // Step3 is update the  width and height of the  gridContainer element
    gridContainer.style.gridTemplateRows = `repeat(${inputRows.value}, 20px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${inputColunms.value}, 20px)`;

    //this function set to 1 a random case in the matrix
    function setRandomAliveCell(Nrows, Ncolumns, percentageAlive) {
        const totalCells = Nrows * Ncolumns;
        const numAliveCells = Math.floor((percentageAlive / 100) * totalCells);

        for (let index = 0; index < numAliveCells; index++) {
            const randomRow = Math.floor(Math.random() * Nrows);
            const randomCol = Math.floor(Math.random() * Ncolumns);
            cellsMatrix[randomRow][randomCol] = 1;
        }
    }



    // set alive some case in the the matrix
    setRandomAliveCell(inputRows.value, inputColunms.value, inputRateRandomCells.value);

    //update the state of each cell
    updateCellClasses();


    //this function recover the id of the cell and toggle the state of that cell
    function handleCellClick(cell) {
        const idCell = cell.id;
        const cellRow = Number(idCell.split("-")[0]);
        const cellCol = Number(idCell.split("-")[1]);
        cell.classList.toggle("alive");
        cellsMatrix[cellRow][cellCol] = 1 - cellsMatrix[cellRow][cellCol];
    }

    //This target all the cell elements in the DOM and add for each a "click" Event  
    allCells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    //This function search all the neighbors alive in a specific cell
    // Every cell  have maximum 8 neigbors
    //for exemple take a cell C1 in the postion rowC1 & colC1 
    //all the neighbors for the cell C1 are in the position between :
    // ---for the row : [rowC1 - 1, rowC1, rowC1 + 1] 
    // ---for the cols : [colC1 - 1, colC1, colC1 + 1] 
    //this function also check in the loop if the index dont overflow the the length of the matrix
    //and also check if the row and the col is never equal (that's mean a the cell C1 itself )
    //after the function return array who contains all C1 alive neigbours  
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

    //this function check all the rules to the game of life
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


    //this function start the nextGeneration
    function handleStartGame() {
        if (!intervalId) {
            intervalId = setInterval(UpdateCell, interval);
        }
        console.log("Game on play");
    }

    //this function stop the game
    function handleStopGame() {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Game Stopped");
    }

    //this function initialize the game by just refreshing the page 😏
    function handleResetGame() {
        window.location.reload();
    }

    //this function initialize the grid 
    function handleClearGrid() {
        handleStopGame();
        cellsMatrix = initMatrix(inputRows.value, inputColunms.value);
        updateCellClasses();
    }

    function handleRandomCell() {
        handleStopGame();
        cellsMatrix = initMatrix(inputRows.value, inputColunms.value);
        setRandomAliveCell(inputRows.value, inputColunms.value, inputRateRandomCells.value)
        updateCellClasses();
    }

    //add "click" Event  for the three button
    btnPlay.addEventListener("click", handleStartGame);
    btnStop.addEventListener("click", handleStopGame);
    btnReset.addEventListener("click", handleResetGame);
    btnClear.addEventListener("click", handleClearGrid);
    btnRandom.addEventListener("click", handleRandomCell);
}

//this function stop the game and check if row and column are correct (they sould be > 0 ) 
//and after run a new round with new Row or/and Col 
function updateRowsCols() {
    clearInterval(intervalId);
    intervalId = null;
    if (inputRows.value > 0 && inputColunms.value > 0)
        newRound(inputRows.value, inputColunms.value);
}

//add "change" Event on the Rows input and Columns input
// for each, we call the the function ---> updateRowsCols() <--- for a new round.
//I launch a new round because if the row or the columns change, the matrix will change
// and if the matrix, the the position of all the elements changes, and their neigbors of course
//in this case we should reset the previous game and run a new round with the new row or/and cols.
inputRows.addEventListener("change", () => {
    updateRowsCols();
});

inputColunms.addEventListener("change", () => {
    updateRowsCols()
});


//add "change" Event on the speed input
//we first stop the game
//after we check if the value is > 0
//if its true we update the value of the speed
inputSpeed.addEventListener("change", () => {
    clearInterval(intervalId);
    intervalId = null;
    if (inputSpeed.value > 0) {
        interval = inputSpeed.value * 1000;
    }
});

//this last lauch a new round when the page is load
window.addEventListener('load', function () {
    newRound(inputRows.value, inputColunms.value);
});

/* I really finish this project touti ma abandonné 😭😭 */