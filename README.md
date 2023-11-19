# GameOfLife

This is the challenge of the Game of Life by [Elias Waly ba](https://github.com/elias-ba) in a tweet on [X](https://twitter.com/eliaswalyba/status/1724460346155340047).

# Game of Life 👀 ? What is this ?🤔

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other.

Source of this definition : [Wikipédia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Rules of the Game Of Life ⚖️

The game follows simple rules:

- 1. **Underpopulation:** A live cell with fewer than two live neighbors dies.
- 2. **Survival:** A live cell with two or three live neighbors survives.
- 3. **Overpopulation:** A live cell with more than three live neighbors dies.
- 4. **Reproduction:** A dead cell with exactly three live neighbors becomes alive.

## My Implementation

### Initialization

- The script initializes variables for grid elements, buttons, and input fields.
- There's a function to initialize a matrix to represent the cell states.

### Updating Cell Classes

- The `updateCellClasses` function updates the visual representation of cells based on their state in the matrix.

### Creating Cell Elements

- The `createCellsElements` function dynamically creates cell elements in the grid and populates the `allCells` array.

### New Round

- The `newRound` function initializes a new round of the game.
- It sets up the matrix, creates cell elements, updates the grid size, sets random alive cells, and updates the cell classes.

### Updating Cells and Game Logic

- The `UpdateCell` function implements the game logic, checking the rules and updating the cell matrix accordingly.
- It is called in intervals to create the animation effect.

### Event Listeners

- Click events are set for each cell to toggle their state.
- Buttons have click events to play, stop, reset, clear, and set random cells.

### Zooming

- There's a function `updateZoom` to handle zoom changes.
- Mouse wheel events are used to zoom in and out, and the browser's default zoom is disabled.

## Functionality

- Adjust rows, columns, speed, rate of random cells, and zoom using the input controls.
- Click on cells to toggle their state.
- Use play, stop, reset, clear, and random buttons to control the simulation.

Here a quick simulation

<h4 style="text-align:center">
note : The speed oh this video has accelerated x5 to reduce the size of the video
</h4>

You can watch the normal simulation on my youtube channel
[![Video](https://img.youtube.com/vi/_bzxRj-jlLE/maxresdefault.jpg)](https://www.youtube.com/watch?v=_bzxRj-jlLE)

## Conclusion
