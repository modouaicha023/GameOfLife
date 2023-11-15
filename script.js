const rows = 100;
const cols = 100;

let cellsMatrix = createEmptyMatrix();


createCellsElements();


function createEmptyMatrix() {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
}

console.log(createEmptyMatrix())


function createCellsElements() {
    const gridContainer = document.querySelector('.grid');

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            gridContainer.appendChild(cell);
        }
    }
}

