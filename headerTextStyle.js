const gameOfLifeText = document.getElementById('game-of-life');

let rowsStyleText = 11;
let colsStyleText = 50;

function initMatrixStyleText() {
    return Array.from({ length: rowsStyleText }, () => Array(colsStyleText).fill(0));
}

gameOfLifeText.style.gridTemplateColumns = `repeat(${colsStyleText ? colsStyleText : 100}, 5px)`;
gameOfLifeText.style.gridTemplateRows = `repeat(${rowsStyleText ? rowsStyleText : 100}, 5px)`;


let cellsMatrixStyleText = initMatrixStyleText();
//G
cellsMatrixStyleText[3][1] = 1;
cellsMatrixStyleText[3][2] = 1;
cellsMatrixStyleText[3][3] = 1;
cellsMatrixStyleText[3][4] = 1
cellsMatrixStyleText[4][1] = 1;
cellsMatrixStyleText[5][1] = 1;
cellsMatrixStyleText[6][1] = 1;
cellsMatrixStyleText[7][1] = 1;
cellsMatrixStyleText[7][2] = 1;
cellsMatrixStyleText[7][3] = 1;
cellsMatrixStyleText[7][4] = 1;
cellsMatrixStyleText[5][3] = 1;
cellsMatrixStyleText[5][4] = 1;
cellsMatrixStyleText[6][4] = 1;

//A
cellsMatrixStyleText[3][7] = 1;
cellsMatrixStyleText[3][8] = 1;
cellsMatrixStyleText[4][6] = 1;
cellsMatrixStyleText[5][6] = 1;
cellsMatrixStyleText[6][6] = 1;
cellsMatrixStyleText[7][6] = 1;

cellsMatrixStyleText[4][9] = 1;
cellsMatrixStyleText[5][9] = 1;
cellsMatrixStyleText[6][9] = 1;
cellsMatrixStyleText[7][9] = 1;

cellsMatrixStyleText[5][7] = 1;
cellsMatrixStyleText[5][8] = 1;

//M
cellsMatrixStyleText[3][11] = 1;
cellsMatrixStyleText[3][12] = 1;
cellsMatrixStyleText[3][14] = 1;
cellsMatrixStyleText[3][15] = 1;
cellsMatrixStyleText[3][11] = 1;

cellsMatrixStyleText[4][11] = 1;
cellsMatrixStyleText[4][13] = 1;
cellsMatrixStyleText[5][11] = 1;
cellsMatrixStyleText[6][11] = 1;
cellsMatrixStyleText[7][11] = 1;

cellsMatrixStyleText[4][15] = 1;
cellsMatrixStyleText[5][15] = 1;
cellsMatrixStyleText[6][15] = 1;
cellsMatrixStyleText[7][15] = 1;

//E
cellsMatrixStyleText[3][17] = 1;
cellsMatrixStyleText[3][18] = 1;
cellsMatrixStyleText[3][19] = 1;
cellsMatrixStyleText[4][17] = 1;
cellsMatrixStyleText[5][17] = 1;
cellsMatrixStyleText[5][18] = 1;
cellsMatrixStyleText[6][17] = 1;
cellsMatrixStyleText[7][17] = 1;
cellsMatrixStyleText[7][18] = 1;
cellsMatrixStyleText[7][19] = 1;

//O

cellsMatrixStyleText[3][24] = 1;
cellsMatrixStyleText[3][25] = 1;
cellsMatrixStyleText[3][26] = 1;

cellsMatrixStyleText[4][23] = 1;
cellsMatrixStyleText[5][23] = 1;
cellsMatrixStyleText[6][23] = 1;


cellsMatrixStyleText[4][27] = 1;
cellsMatrixStyleText[5][27] = 1;
cellsMatrixStyleText[5][25] = 1;
cellsMatrixStyleText[6][27] = 1;

cellsMatrixStyleText[7][24] = 1;
cellsMatrixStyleText[7][25] = 1;
cellsMatrixStyleText[7][26] = 1;

//F
cellsMatrixStyleText[3][29] = 1;
cellsMatrixStyleText[3][30] = 1;
cellsMatrixStyleText[3][31] = 1;
cellsMatrixStyleText[4][29] = 1;
cellsMatrixStyleText[5][29] = 1;
cellsMatrixStyleText[5][30] = 1;
cellsMatrixStyleText[6][29] = 1;
cellsMatrixStyleText[7][29] = 1;

//L
cellsMatrixStyleText[3][35] = 1;
cellsMatrixStyleText[4][35] = 1;
cellsMatrixStyleText[5][35] = 1;
cellsMatrixStyleText[6][35] = 1;
cellsMatrixStyleText[7][35] = 1;
cellsMatrixStyleText[7][36] = 1;
cellsMatrixStyleText[7][37] = 1;

//I
cellsMatrixStyleText[3][39] = 1;
cellsMatrixStyleText[4][39] = 1;
cellsMatrixStyleText[5][39] = 1;
cellsMatrixStyleText[6][39] = 1;
cellsMatrixStyleText[7][39] = 1;

//F
cellsMatrixStyleText[3][41] = 1;
cellsMatrixStyleText[3][42] = 1;
cellsMatrixStyleText[3][43] = 1;
cellsMatrixStyleText[4][41] = 1;
cellsMatrixStyleText[5][41] = 1;
cellsMatrixStyleText[5][42] = 1;
cellsMatrixStyleText[6][41] = 1;
cellsMatrixStyleText[7][41] = 1;

//E
cellsMatrixStyleText[3][45] = 1;
cellsMatrixStyleText[3][46] = 1;
cellsMatrixStyleText[3][47] = 1;
cellsMatrixStyleText[4][45] = 1;
cellsMatrixStyleText[5][45] = 1;
cellsMatrixStyleText[5][46] = 1;
cellsMatrixStyleText[5][47] = 1;
cellsMatrixStyleText[6][45] = 1;
cellsMatrixStyleText[7][45] = 1;
cellsMatrixStyleText[7][46] = 1;
cellsMatrixStyleText[7][47] = 1;

let allCellsStyleText = [];


createCellsElementsStyleText();


function createCellsElementsStyleText() {
    for (let i = 0; i < rowsStyleText; i++) {
        for (let j = 0; j < colsStyleText; j++) {
            const cellStyleText = document.createElement('div');
            cellStyleText.className = 'gameOfLifeCase';
            cellStyleText.id = `styleText-${i}-${j}`;
            gameOfLifeText.appendChild(cellStyleText);
            allCellsStyleText.push(cellStyleText);
        }
    }
}

updateCellClassStyleText();


function getAliveCellNeighborsStyleText(row, col) {
    let neighborsStyleText = [];

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < cellsMatrixStyleText.length && j >= 0 && j < cellsMatrixStyleText[0].length) {
                if (!(i === row && j === col) && cellsMatrixStyleText[i][j] === 1) {
                    neighborsStyleText = [...neighborsStyleText, { "row": i, "col": j }];
                }
            }
        }
    }

    return neighborsStyleText;
}


function UpdateCellStyleText() {
    const updatedMatrixStyleText = initMatrixStyleText();
    cellsMatrixStyleText.forEach((row, i) => {
        row.forEach((col, j) => {
            const numNeighborsAliveStyleText = getAliveCellNeighborsStyleText(i, j).length;

            if (cellsMatrixStyleText[i][j] === 0 && numNeighborsAliveStyleText === 3) {
                updatedMatrixStyleText[i][j] = 1;
            } else if (cellsMatrixStyleText[i][j] === 1 && (numNeighborsAliveStyleText === 3 || numNeighborsAliveStyleText === 2)) {
                updatedMatrixStyleText[i][j] = 1;
            } else if (numNeighborsAliveStyleText < 2 || numNeighborsAliveStyleText > 3) {
                updatedMatrixStyleText[i][j] = 0;
            }
        });
    });

    cellsMatrixStyleText = updatedMatrixStyleText;
    updateCellClassStyleText();
}

function updateCellClassStyleText() {
    allCellsStyleText.forEach((cellStyleText) => {
        const idCellStyleText = cellStyleText.id;
        const cellRowStyleText = Number(idCellStyleText.split("-")[1]);
        const cellColStyleText = Number(idCellStyleText.split("-")[2]);
        cellStyleText.classList.toggle("aliveStyleText", cellsMatrixStyleText[cellRowStyleText][cellColStyleText] === 1);
    });
}

let intervalStyleText = 20 * 1000; // 5 second
setInterval(UpdateCellStyleText, intervalStyleText);
