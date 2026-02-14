import { Cell, Level } from './types';

export const GRID_SIZE = 5;

export const getGrid = (level: Level): Cell[] => {
    const grid: Cell[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const id = row * GRID_SIZE + col;
            const value = level.initialValues[id] || null;
            grid.push({
                id,
                row,
                col,
                value,
                isFixed: value !== null
            });
        }
    }
    return grid;
};

// FLEXIBLE EXPLORATION Logic - Users can explore freely
export const isValidMove = (
    currentIndex: number,
    nextIndex: number,
    path: number[],
    grid: Cell[]
): boolean => {
    const currentRow = Math.floor(currentIndex / GRID_SIZE);
    const currentCol = currentIndex % GRID_SIZE;
    const nextRow = Math.floor(nextIndex / GRID_SIZE);
    const nextCol = nextIndex % GRID_SIZE;

    // 1. Must be adjacent (no diagonals)
    const isAdjacent =
        (Math.abs(currentRow - nextRow) === 1 && currentCol === nextCol) ||
        (Math.abs(currentCol - nextCol) === 1 && currentRow === nextRow);
    if (!isAdjacent) return false;

    // 2. No revisiting cells
    if (path.includes(nextIndex)) return false;

    // 3. Ascending order enforcement
    // Find last fixed number in current path
    let lastFixedValue = 0;
    for (let i = path.length - 1; i >= 0; i--) {
        const cellId = path[i];
        const cell = grid[cellId];
        if (cell.value !== null) {
            lastFixedValue = cell.value;
            break;
        }
    }

    const nextTargetValue = lastFixedValue + 1;
    const targetCell = grid[nextIndex];

    // If moving to a numbered cell, it MUST be the next sequential number
    if (targetCell && targetCell.value !== null) {
        if (targetCell.value !== nextTargetValue) {
            return false;
        }
    }

    // Empty cells: always allowed (user can explore)
    return true;
};

export const isLevelComplete = (path: number[], grid: Cell[]): boolean => {
    if (path.length === 0) return false;

    // Get all numbered cells from grid
    const numberedCells = grid.filter(cell => cell.value !== null);
    if (numberedCells.length === 0) return false;

    // Get the highest number
    const maxNumber = Math.max(...numberedCells.map(c => c.value!));

    // Track which numbers we've seen in the path
    let currentNumber = 0;

    for (const cellId of path) {
        const cell = grid[cellId];
        if (cell.value !== null) {
            // Check if this is the next expected number in sequence
            if (cell.value === currentNumber + 1) {
                currentNumber = cell.value;
            } else if (cell.value !== currentNumber) {
                // Out of order or revisiting
                return false;
            }
        }
    }


    // CRITICAL: Level is complete ONLY if:
    // 1. We've reached the highest number in correct order
    // 2. ALL 25 cells are covered (path.length must be 25)
    return currentNumber === maxNumber && path.length === GRID_SIZE * GRID_SIZE;
};
