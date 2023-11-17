const body = document.getElementById('body');

let rowsStyle = 100;
let colsStyle = 100;

function initMatrixStyle() {
    return Array.from({ length: rowsStyle }, () => Array(colsStyle).fill(0));
}

body.style.gridTemplateColumns = `repeat(${colsStyle ? colsStyle : 100}, 50px)`;
body.style.gridTemplateRows = `repeat(${rowsStyle ? rowsStyle : 100}, 50px)`;


let cellsMatrixStyle = initMatrixStyle();
setAliveSomeCell();
setInterval(setAliveSomeCell,2000)
function setAliveSomeCell() {
    for (let index = 0; index < rowsStyle*colsStyle; index++) {
        const r = Math.floor(Math.random() * rowsStyle);
        const c = Math.floor(Math.random() * colsStyle);
        cellsMatrixStyle[r][c] = 1;
    }
}

let allCellsStyle = [];


createCellsElementsStyle();


function createCellsElementsStyle() {
    for (let i = 0; i < rowsStyle; i++) {
        for (let j = 0; j < colsStyle; j++) {
            const cellStyle = document.createElement('div');
            cellStyle.className = 'cellStyle';
            cellStyle.id = `style-${i}-${j}`;
            body.appendChild(cellStyle);
            allCellsStyle.push(cellStyle);
        }
    }
}

updateCellClassStyle();


function getAliveCellNeighborsStyle(row, col) {
    let neighborsStyle = [];

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < cellsMatrixStyle.length && j >= 0 && j < cellsMatrixStyle[0].length) {
                if (!(i === row && j === col) && cellsMatrixStyle[i][j] === 1) {
                    neighborsStyle = [...neighborsStyle, { "row": i, "col": j }];
                }
            }
        }
    }

    return neighborsStyle;
}


function UpdateCellStyle() {
    const updatedMatrixStyle = initMatrixStyle();
    cellsMatrixStyle.forEach((row, i) => {
        row.forEach((col, j) => {
            const numNeighborsAliveStyle = getAliveCellNeighborsStyle(i, j).length;

            if (cellsMatrixStyle[i][j] === 0 && numNeighborsAliveStyle === 3) {
                updatedMatrixStyle[i][j] = 1;
            } else if (cellsMatrixStyle[i][j] === 1 && (numNeighborsAliveStyle === 3 || numNeighborsAliveStyle === 2)) {
                updatedMatrixStyle[i][j] = 1;
            } else if (numNeighborsAliveStyle < 2 || numNeighborsAliveStyle > 3) {
                updatedMatrixStyle[i][j] = 0;
            }
        });
    });

    cellsMatrixStyle = updatedMatrixStyle;
    updateCellClassStyle();
}

function updateCellClassStyle() {
    allCellsStyle.forEach((cellStyle) => {
        const idCellStyle = cellStyle.id;
        const cellRowStyle = Number(idCellStyle.split("-")[1]);
        const cellColStyle = Number(idCellStyle.split("-")[2]);
        cellStyle.classList.toggle("aliveStyle", cellsMatrixStyle[cellRowStyle][cellColStyle] === 1);
    });
}

let intervalStyle = .5 * 1000; // 1 second
setInterval(UpdateCellStyle, intervalStyle);