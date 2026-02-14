import { Level } from './types';
import { GRID_SIZE } from './logic';

// Color palette for different levels
const LEVEL_COLORS = [
    { start: '#ff6b6b', end: '#ee5a6f' },  // Red
    { start: '#4ecdc4', end: '#44a08d' },  // Teal
    { start: '#ffd93d', end: '#ff9a3d' },  // Gold
    { start: '#6c5ce7', end: '#a29bfe' },  // Purple
    { start: '#00b894', end: '#00cec9' },  // Green
    { start: '#fd79a8', end: '#e84393' },  // Pink
    { start: '#fdcb6e', end: '#e17055' },  // Orange
];

// Seeded random number generator for unique, reproducible levels
class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    shuffle<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

export const generateHamiltonianPath = (size: number, seed: number): number[] => {
    const totalCells = size * size;
    const visited = new Set<number>();
    const path: number[] = [];
    const rng = new SeededRandom(seed);

    // Function to get valid neighbors (seeded randomization)
    const getNeighbors = (index: number) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const neighbors: number[] = [];

        const dirs = [
            [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
        ];

        const shuffled = rng.shuffle(dirs);

        for (const [dr, dc] of shuffled) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < size && c >= 0 && c < size) {
                neighbors.push(r * size + c);
            }
        }
        return neighbors;
    };

    const dfs = (current: number): boolean => {
        visited.add(current);
        path.push(current);

        if (path.length === totalCells) {
            return true;
        }

        const neighbors = getNeighbors(current);
        for (const next of neighbors) {
            if (!visited.has(next)) {
                if (dfs(next)) {
                    return true;
                }
            }
        }

        // Backtrack
        path.pop();
        visited.delete(current);
        return false;
    };

    // Try different starting positions based on level seed
    const startPositions = rng.shuffle([...Array(totalCells).keys()]);

    for (const startNode of startPositions.slice(0, 10)) {
        visited.clear();
        path.length = 0;
        if (dfs(startNode)) {
            return path;
        }
    }

    // Fallback
    visited.clear();
    path.length = 0;
    if (dfs(0)) return path;

    throw new Error("Failed to generate Hamiltonian path");
};

export const generateLevel = (id: number, difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'insane' = 'medium'): Level => {
    // Use level ID as seed for unique, reproducible levels
    const seed = id * 12345 + 67890;
    const rng = new SeededRandom(seed);

    const path = generateHamiltonianPath(GRID_SIZE, seed);

    // Variable checkpoint counts with MORE variation
    const checkpointRanges = {
        easy: [3, 4, 5, 6],
        medium: [7, 8, 9, 10, 11],
        hard: [12, 13, 14, 15],
        expert: [16, 17, 18],
        insane: [19, 20, 21, 22] // Extra hard!
    };

    const possibilities = checkpointRanges[difficulty];
    const targetCheckpoints = possibilities[rng.nextInt(0, possibilities.length - 1)];
    const initialValues: Record<number, number> = {};

    // Always set 1
    initialValues[path[0]] = 1;

    // Distribute other numbers with seeded randomness
    const checkpoints = [0];

    // Add random intermediate points
    const maxAttempts = path.length * 2;
    let attempts = 0;

    while (checkpoints.length < targetCheckpoints - 1 && attempts < maxAttempts) {
        const idx = rng.nextInt(1, path.length - 2);
        if (!checkpoints.includes(idx)) {
            checkpoints.push(idx);
        }
        attempts++;
    }

    // Always add the last one
    checkpoints.push(path.length - 1);

    checkpoints.sort((a, b) => a - b);

    // Assign values
    checkpoints.forEach((pathIndex, i) => {
        const cellId = path[pathIndex];
        initialValues[cellId] = i + 1;
    });

    // Select color based on level ID
    const color = LEVEL_COLORS[id % LEVEL_COLORS.length];

    return {
        id,
        initialValues,
        solutionPath: path,
        color
    };
};
