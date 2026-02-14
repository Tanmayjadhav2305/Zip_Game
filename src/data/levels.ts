import { Level } from '../game/types';

export const LEVEL_1: Level = {
    id: 1,
    initialValues: {
        5: 2,  // Row 1, Col 0
        9: 4,  // Row 1, Col 4
        11: 3, // Row 2, Col 1
        12: 5, // Row 2, Col 2
        15: 7, // Row 3, Col 0
        19: 6, // Row 3, Col 4
        21: 1  // Row 4, Col 1 (Start)
    },
    solutionPath: [21, 16, 11, 6, 5, 0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 17, 12, 7, 8, 13, 18, 20, 15, 10],
    color: { start: '#ff6b35', end: '#f7931e' }
};

export const LEVELS = [LEVEL_1];
