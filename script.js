const rows = 100;
const cols = 100;

let cellsMatrix = createEmptyMatrix();


createCellsElements();


function createEmptyMatrix() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

console.log(createEmptyMatrix())


function createCellsElements() {
    const gridContainer = document.querySelector('.grid');

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `${row}-${col}`;
            gridContainer.appendChild(cell);
        }
    }
}

let allCells = document.querySelectorAll(".cell") && document.querySelectorAll(".cell");

const handleCellClick = (cell) => {
    cell.classList.toggle("alive");
    console.log(cell.id);
}

allCells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell))
})
