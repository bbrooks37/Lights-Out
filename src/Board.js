import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';

/**
 * Creates the initial grid for the Lights Out game.
 *
 * @param {number} size - The size of the grid (e.g., 5 for a 5x5 grid).
 * @param {number} difficulty - A value between 0 and 1 representing the 
 *                              probability of a cell being initially lit.
 * @returns {boolean[][]} A 2D array representing the grid, 
 *                         where 'true' indicates a lit cell and 'false' an unlit cell.
 */
function createInitialGrid(size, difficulty) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(Math.random() < difficulty); // Set initial state randomly
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Checks if the game is won (all cells are off).
 *
 * @param {boolean[][]} grid - The current game grid.
 * @returns {boolean} True if the game is won, false otherwise.
 */
function checkForWin(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) {
        return false; // If any cell is lit, game is not won
      }
    }
  }
  return true; // All cells are off, game is won
}

/**
 * The main component for the Lights Out game.
 *
 * @param {object} props - Component props.
 * @param {number} props.size - The size of the game grid.
 * @param {number} props.difficulty - The difficulty level of the game.
 * @returns {JSX.Element} The rendered game board.
 */
function Board({ size, difficulty }) {
  const [grid, setGrid] = useState(createInitialGrid(size, difficulty));
  const [isWon, setIsWon] = useState(false);

  /**
   * Updates the game state when a cell is clicked.
   */
  useEffect(() => {
    setIsWon(checkForWin(grid)); 
  }, [grid]); 

  const handleClick = (rowIndex, colIndex) => {
    const newGrid = [...grid]; 
    toggleCell(newGrid, rowIndex, colIndex);
    setGrid(newGrid);
  };

  /**
   * Toggles the state of the clicked cell and its neighbors.
   * 
   * @param {boolean[][]} grid - The current game grid.
   * @param {number} rowIndex - The row index of the cell to toggle.
   * @param {number} colIndex - The column index of the cell to toggle.
   */
  const toggleCell = (grid, rowIndex, colIndex) => {
    grid[rowIndex][colIndex] = !grid[rowIndex][colIndex]; 

    // Toggle neighbors (handle edge cases)
    if (rowIndex > 0) {
      grid[rowIndex - 1][colIndex] = !grid[rowIndex - 1][colIndex];
    }
    if (rowIndex < size - 1) {
      grid[rowIndex + 1][colIndex] = !grid[rowIndex + 1][colIndex];
    }
    if (colIndex > 0) {
      grid[rowIndex][colIndex - 1] = !grid[rowIndex][colIndex - 1];
    }
    if (colIndex < size - 1) {
      grid[rowIndex][colIndex + 1] = !grid[rowIndex][colIndex + 1];
    }
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell 
              key={`${rowIndex}-${colIndex}`} 
              isOn={cell} 
              onClick={() => handleClick(rowIndex, colIndex)} 
            />
          ))}
        </div>
      ))}
      {isWon && <div className="winner">You Won!</div>}
    </div>
  );
}

export default Board;