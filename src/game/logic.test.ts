import { expect, test, describe } from 'vitest';
import { isValidMove, isLevelComplete, getGrid } from '../game/logic';
import { Level } from '../game/types';
import { LEVELS } from '../data/levels';

describe('Game Logic', () => {
    const level = LEVELS[0];
    const grid = getGrid(level);

    test('isValidMove: allows adjacent empty cells', () => {
        // Start at 21 (which has value 1)
        const path = [21];
        // Check adjacency to empty cells
        expect(isValidMove(21, 22, path, grid)).toBe(true); // Right
        expect(isValidMove(21, 16, path, grid)).toBe(true); // Up
    });

    test('isValidMove: prevents diagonal moves', () => {
        const path = [21];
        // 17 is diagonal from 21
        expect(isValidMove(21, 17, path, grid)).toBe(false);
    });

    test('isValidMove: enforces sequential numbered cells', () => {
        // Path starting at cell 21 (value 1)
        const path = [21];
        // Cell 11 has value 2 (next sequential number)
        expect(isValidMove(21, 11, path, grid)).toBe(true);

        // Cannot jump to cell 7 (value 3) without visiting 2 first
        expect(isValidMove(21, 7, path, grid)).toBe(false);
    });

    test('isValidMove: prevents revisiting cells', () => {
        const path = [21, 22, 23];
        // Cannot go back to 22
        expect(isValidMove(23, 22, path, grid)).toBe(false);
    });

    test('isLevelComplete: validates numbered cell completion', () => {
        // Create a test level with numbered cells
        const testLevel: Level = {
            id: 999,
            initialValues: {
                [0]: 1,
                [5]: 2,
                [10]: 3,
                [15]: 4,
                [20]: 5
            },
            solutionPath: [],
            color: { start: '#ff6b35', end: '#f7931e' }
        };
        const testGrid = getGrid(testLevel);

        // Complete path visiting all 5 numbered cells in order
        const fullPath = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        expect(isLevelComplete(fullPath, testGrid)).toBe(true);

        // Partial path - only visited first 2 numbers
        const partialPath = [0, 5];
        expect(isLevelComplete(partialPath, testGrid)).toBe(false);
    });
});
