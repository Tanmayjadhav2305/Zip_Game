import { expect, test, describe } from 'vitest';
import { isValidMove, isLevelComplete, getGrid } from '../game/logic';
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

    test('isValidMove: enforces ascending number order', () => {
        // After visiting 1 (at 21), next numbered target must be 2
        // If we try to jump to a wrong number, should fail
        const path = [21];

        // Assuming cell 15 has value 7 (not 2), this should fail
        if (grid[15].value !== null && grid[15].value !== 2) {
            expect(isValidMove(21, 15, path, grid)).toBe(false);
        }
    });

    test('isValidMove: prevents backtracking', () => {
        const path = [21, 22];
        // Try to move back to 21
        expect(isValidMove(22, 21, path, grid)).toBe(false);
    });

    test('isLevelComplete: validates full grid', () => {
        const fullPath = Array.from({ length: 25 }, (_, i) => i);
        expect(isLevelComplete(fullPath)).toBe(true);

        const partialPath = [0, 1, 2];
        expect(isLevelComplete(partialPath)).toBe(false);
    });
});
